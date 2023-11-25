import { useEthers, useEtherBalance } from "@usedapp/core";

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div className="bg-gray-800 p-4 rounded-lg">
      <p className="text-white text-md">
        {etherBalance && JSON.stringify(etherBalance)} ETH
      </p>
    </div>
  ) : (
    <button
      onClick={handleConnectWallet}
      className="bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-purple-500"
    >
      Connect to your Metamask wallet
    </button>
  );
}
