// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FamilyPlus{

    address payable owner;

    //guardian-related variables
    //the proposed new owner address by guardians
    address payable proposedNewOwnerAddress;
    //given an address, check if it is a guardian
    mapping (address => bool) public isGuardian;
    //essentially acts as an array of 5, keeping track of all guardian addresses
    mapping (uint => address) public guardiansList;
    //keeps track of which address has proposed a new owner address, 
    //because we cannot have the same address propose 3 times and then reset the owner address
    mapping (address => bool) public hasProposedNewOwnerAddress;
    //keeps track of the number of guardians
    uint public numberOfGuardians;
    //counting how many guardians agreed to reset owner address
    uint private guardianConsensusCount;

    struct Item {
        string Id;
        bytes CypherText;
    }

    mapping (address => Item[]) private items;

    function read(string memory id) view public returns(bytes memory){
        address addr = address(msg.sender);
        Item[] memory userItems = items[addr];
        for (uint i = 0; i < userItems.length; i++){
            if (keccak256(abi.encodePacked(userItems[i].Id)) == keccak256(abi.encodePacked(id))){
                return userItems[i].CypherText;
            }
        }
        return "0x";

    }

    function write(string memory id, bytes memory cyphertext) public {
        address addr = address(msg.sender);
        Item memory newItem = Item(id, cyphertext);
        items[addr].push(newItem);
    }

    function extendAccess(string memory id, address accountToGiveAccess) public returns(string memory){
        address myAddr = address(msg.sender);
        Item[] memory myUserItems = items[myAddr];

        for (uint i = 0; i < myUserItems.length; i++){
            if (keccak256(abi.encodePacked(myUserItems[i].Id)) == keccak256(abi.encodePacked(id))){
                Item memory newItem = Item(id, myUserItems[i].CypherText);
                items[accountToGiveAccess].push(newItem);
                return "Success!";
            }
        }

        return "Failure!";
    }

    function list() view public returns(string[] memory){
        address addr = address(msg.sender);
        Item[] memory userItems = items[addr];
        string[] memory Ids = new string[](userItems.length);
        for (uint i = 0; i < userItems.length; i++){
            Ids[i] = userItems[i].Id;
        }
        return Ids;
    }

    //allowance-related variables
    //given an address, see if the address has an allowance
    mapping (address => bool) public hasAllowance;
    //given an address, see how much allowance it has
    mapping (address => uint) public allowanceAmount;

    constructor(){
        owner = payable(msg.sender);
    }


    function setGuardian(address guardianAddress) private{
        require(msg.sender == owner, "Only the owner can set guardians.");
        require(numberOfGuardians < 5, "Cannot set more than 5 guardians");
        require(isGuardian[guardianAddress] == false, "This address is already a guardian.");
        isGuardian[guardianAddress] = true;
        guardiansList[numberOfGuardians] = guardianAddress;
        numberOfGuardians += 1;
    }

    function changeGuardian(address oldGuardian, address newGuardian) public {
        require(msg.sender == owner, "Only the owner can change guardians.");
        require(numberOfGuardians == 5, "Set a total of 5 guardians first before changing guardians.");
        //basically swapping the old guardina out with the new guardian
        //while updating the guardianList to keep track of guardian addresses
        isGuardian[oldGuardian] = false;
        isGuardian[newGuardian] = true;
        for(uint i=0; i<5; i+=1){
            if(guardiansList[i] == oldGuardian){
                guardiansList[i] = newGuardian;
                break;
            }
        }
    }

    function setNewOwnerAddress(address payable newOwnerAddress) public{
        require(isGuardian[msg.sender],"Only a guardian can set new owner address.");
        //if a guardian proposes a new owner address for the first time,
        //or if the proposed new owner address is different from what was proposed before,
        //the proposed new owner address gets updated, and old one is forgotten.
        if(proposedNewOwnerAddress != newOwnerAddress){
            proposedNewOwnerAddress = newOwnerAddress;
            guardianConsensusCount = 0;

            //clear array
            for(uint i=0; i<5; i+=1){
                hasProposedNewOwnerAddress[guardiansList[i]] = false;
            }
        }

        //basically saying is a guardian has not proposed new owner address before, then we increment the count
        //otherwise, the same guardian can just proposed the new owner address 3 times and reset the owner address
        if(hasProposedNewOwnerAddress[msg.sender] == false){
            guardianConsensusCount += 1;
            hasProposedNewOwnerAddress[msg.sender] = true;
        }

        if(guardianConsensusCount >= 3){
            owner = proposedNewOwnerAddress;
            proposedNewOwnerAddress = payable(address(0));

            //clear array
            for(uint i=0; i<5; i+=1){
                hasProposedNewOwnerAddress[guardiansList[i]] = false;
            }

        }
    }
}