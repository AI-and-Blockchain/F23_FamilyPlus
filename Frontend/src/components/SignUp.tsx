import React from 'react';

interface SignupProps {
  onSignup: (user: { address: string; username: string }) => void;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface MetaMaskInpageProvider {
  request: (args: { method: string }) => Promise<any>;
  // Add any other properties specific to MetaMaskInpageProvider
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  // Function to handle the signup process via MetaMask
  const handleSignup = async (): Promise<void> => {
    try {
      // Check if MetaMask is installed
      const ethereum = window.ethereum as MetaMaskInpageProvider | undefined;
      if (ethereum) {
        // Request account access if needed
        await ethereum.request({ method: 'eth_requestAccounts' });

        // Get the selected account
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        // Check if an account is available
        if (accounts.length > 0) {
          // Get the network ID
          const networkId = await ethereum.request({ method: 'net_version' });

          // Check if connected to the correct network (replace '1' with the desired network ID)
          if (networkId === '1') {
            // For simplicity, create a fake user object
            const fakeUser = {
              address: accounts[0],
              username: 'newUser',
            };

            // Trigger the signup callback with the user data
            onSignup(fakeUser);
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
      console.error('Error signing up via MetaMask:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Button to initiate MetaMask signup */}
      <button onClick={handleSignup}>Sign Up via MetaMask</button>
    </div>
  );
};

export default Signup;
