Smart contract url on testnet scanner: 
1) Implimentation Smatr Contract: https://sepolia.etherscan.io/address/0xac77b589373d29d3a01d693e53cae860122080fd#code
2) Proxy Smart Contract         : https://sepolia.etherscan.io/address/0x3e3b1b5aea3818ff7d3130082baf0db8a9873dc2#code

Vite App for Smart Contract Proxy Implementation
This document provides an overview of the Vite app developed for interacting with a smart contract proxy on the Ethereum blockchain. The app allows users to perform various operations such as minting tokens, staking, unstaking, and retrieving token balances and staking details.

Technologies Used
React
ethers.js
Vite
Installation
Clone the repository to your local machine.
Install dependencies using npm:
Copy code
npm install
Configuration
Ensure the following variables are correctly configured in the code:

PROXY_ADDRESS: Ethereum address of the proxy contract
IMPLEMENTATION_ADDRESS: Ethereum address of the implementation contract
Usage
Run the app:
arduino
Copy code
npm run dev
Open your browser and navigate to  http://localhost:5173/.
Connect your MetaMask wallet.
Perform operations such as minting, staking, unstaking, and retrieving token balances and staking details.
Functionality
initMetaMask: Initializes MetaMask and retrieves the user's Ethereum address and signer.
mint: Mints tokens by interacting with the proxy contract.
stake: Stakes tokens by interacting with the proxy contract.
unstake: Unstakes tokens by interacting with the proxy contract.
balanceOf: Retrieves the token balance of the connected wallet.
getStakingDetails: Retrieves staking details such as the amount staked and staking time.
Points of Difficulty
MetaMask Integration: Integrating MetaMask and handling user authentication and permissions posed challenges due to the asynchronous nature of blockchain interactions.
Contract Interaction: Interacting with the proxy contract and handling transaction failures and unexpected behavior required thorough error handling and debugging.
State Management: Managing state and ensuring proper synchronization between different components of the application required careful consideration and testing.

Conclusion
The Vite app provides a user-friendly interface for interacting with a smart contract proxy on the Ethereum blockchain. Despite encountering challenges during development, the app successfully demonstrates key functionalities and interactions with the contract.





-------------------------------------------------------------------- Test in Node Js ----------------------------------------------------------------------------------------- 





Smart Contract Proxy Implementation Documentation
This document provides an overview of the implementation of a smart contract proxy and associated interactions with the Ethereum blockchain. The provided code demonstrates interactions with the proxy contract deployed on the Ethereum network.

Technologies Used
Node.js
ethers.js
Prerequisites
Node.js installed on your system
Ethereum wallet with sufficient funds for testing
Code Overview
The provided code interacts with a smart contract proxy deployed on the Ethereum blockchain. It utilizes the ethers.js library to interact with the blockchain and perform various operations on the smart contract.

Setup
Clone the repository to your local machine.
Install dependencies using npm: npm install
Configuration
Ensure the following variables are correctly configured in the code:

tokenAddress: Ethereum address of the token contract
proxyAddress: Ethereum address of the proxy contract
RPC: Ethereum RPC endpoint
pk: Private key associated with your Ethereum wallet (for testing purposes)
Usage
To run the code, execute the following command:

node test.js


Points of Difficulty

During the implementation process, the following difficulties were encountered:

Understanding Proxy Contract Functionality: Understanding the behavior and functionality of the proxy contract and its associated implementation contract required thorough analysis and documentation review.
Contract Interaction: Interacting with the proxy contract and ensuring correct function invocation while maintaining transaction integrity posed challenges due to the asynchronous nature of blockchain interactions.

Testing and Debugging: Testing the contract interactions and debugging issues related to transaction failures and unexpected behavior required significant effort and attention to detail.

Conclusion
The provided code demonstrates the interaction with a smart contract proxy on the Ethereum blockchain. Despite encountering challenges during development, the implementation successfully demonstrates key functionalities and interactions with the contract.

For any further questions or inquiries, please contact the project maintainers.
