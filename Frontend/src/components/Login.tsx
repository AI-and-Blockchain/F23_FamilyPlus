import React from 'react';
import { MetaMaskInpageProvider } from "@metamask/providers";


declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

interface LoginProps {
  onLogin: (user: { address: string; username: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    // Function to handle the login process via MetaMask
    const handleLogin = async (): Promise<void> => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
  
          // Get the selected account
            const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          }) as string[]; // Use non-null assertion
  
          // Check if accounts is not undefined and has a length
          if (accounts && accounts.length > 0) {
            // Get the network ID
            const networkId = await window.ethereum.request({ method: 'net_version' });
  
            // Check if connected to the correct network (replace '1' with the desired network ID)
            if (networkId === '1') {
              // For simplicity, create a fake user object
              const fakeUser = {
                address: accounts[0],
                username: 'exampleUser',
              };
  
              // Trigger the login callback with the user data
              onLogin(fakeUser);
            } else {
              console.error('Please connect to the correct Ethereum network');
            }
          } else {
            console.error('No accounts found');
          }
        } else {
          console.error('MetaMask not installed');
        }
      } catch (error) {
        console.error('Error logging in via MetaMask:', error);
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        {/* Button to initiate MetaMask login */}
        <button onClick={handleLogin}>Login via MetaMask</button>
      </div>
    );
  };
  
  export default Login;