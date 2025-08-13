// Import the Ethers.js library
const { ethers } = require("ethers");

// Infura Project ID (used to connect to Ethereum network via Infura's RPC endpoint)
const INFURA_ID = ''; // <-- Fill with your Infura Project ID

// Create a provider using Sepolia testnet via Infura
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

// Sender & Receiver Ethereum addresses
const sender = '0xBa55C05DE72ceac30C1bF53c29Be89293b7D712A';
const reciver = '0x1fAAAbCd3dFcc72ca47eadBB5b793d4693936140';

// Private key of sender's wallet (DO NOT share this publicly)
const sender_private_key = ''; // <-- Fill with your sender private key

// Create a wallet instance from the private key and connect it to the provider
const wallet = new ethers.Wallet(sender_private_key, provider);

// Minimal ABI for ERC20 tokens — only `balanceOf` and `transfer` functions
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)", // Read token balance
  "function transfer(address to, uint amount) returns (bool)", // Transfer tokens
];

// ERC20 contract address (this one is Chainlink LINK token on Sepolia testnet)
const Address = '0x779877A7B0D9E8603169DdbD7836e478b4624789';

// Create a contract instance (read-only by default) using the ERC20 ABI and provider
const contract = new ethers.Contract(Address, ERC20_ABI, provider);

const main = async () => {
  
  // 1. Read sender's token balance before transaction
  const balance = await contract.balanceOf(sender);
  console.log(`Reading from the ${Address} contract\n`);
  console.log(`Balance of sender before transaction: ${ethers.utils.formatEther(balance)}\n`);
  
  // 2. Connect the contract to the wallet to enable sending transactions
  const contractWithWallet = contract.connect(wallet);

  // 3. Execute token transfer (sending 3 tokens from sender to receiver)
  // Note: The "3" here is in raw units (depends on token's decimals — for LINK it's 18 decimals)
  const tx = await contractWithWallet.transfer(reciver, "3");
  
  // 4. Wait for the transaction to be mined
  await tx.wait();
  
  // 5. Log transaction details
  console.log(tx);

  // 6. Read balances after transaction
  const balanceOfsender = await contract.balanceOf(sender);
  const balanceOfreciver = await contract.balanceOf(reciver);

  console.log(`Balance of sender after transaction: ${ethers.utils.formatEther(balanceOfsender)}\n`);
  console.log(`Balance of receiver after transaction: ${ethers.utils.formatEther(balanceOfreciver)}\n`);
};

// Run the main function
main();

 //LINK Contract
  //drips 25 link tranction hash
//   0xed7172f57eaeff17ca04228138f6139494766a44b3c2153c5df0a76574cc1da8
// ---------------- Transaction Output Explanation ----------------

// Reading from the smart contract at address:
// 0x779877A7B0D9E8603169DdbD7836e478b4624789

// Balance of sender's wallet BEFORE transaction execution:
// 50.0 ETH (on the specified network)

// Transaction object details:
// {
//   type: 2, // EIP-1559 transaction type (dynamic fee)
//   chainId: 11155111, // Sepolia Testnet network ID
//   nonce: 2, // Number of transactions previously sent from this sender
//
//   maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00' },
//       // Tip paid to miners per gas unit (in wei)
//
//   maxFeePerGas: BigNumber { _hex: '0x01bf5d469c' },
//       // Max total fee per gas unit sender is willing to pay (in wei)
//
//   gasPrice: null, // Null because this is a dynamic fee transaction
//
//   gasLimit: BigNumber { _hex: '0xcb17' },
//       // Max gas units this transaction can consume
//
//   to: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
//       // Contract address receiving the transaction
//
//   value: BigNumber { _hex: '0x00' },
//       // Amount of ETH sent (0 means only a function call, no direct ETH transfer)
//
//   data: '0xa9059cbb0000000000000000000000001faaabcd3dfcc72ca47eadbb5b793d46939361400000000000000000000000000000000000000000000000000000000000000003',
//       // Encoded function call data (here it's ERC-20 `transfer` with recipient & amount)
//
//   accessList: [], // No pre-declared storage slots or addresses for gas savings
//
//   hash: '0xe9be0fe3faa0f232ebff16774676f952a6ae197e50bc070bee8bac03eda42164',
//       // Unique identifier (hash) for this transaction
//
//   v, r, s: // Components of the cryptographic transaction signature
//
//   from: '0xBa55C05DE72ceac30C1bF53c29Be89293b7D712A',
//       // Address of the sender
//
//   confirmations: 0, // Transaction just broadcasted, no block confirmations yet
//
//   wait: [Function (anonymous)]
//       // Method to wait for transaction confirmation
// }

// Balance of sender AFTER transaction:
// 49.999999999999999997 ETH
// (Small decrease due to gas fees)

// Balance of receiver AFTER transaction:
// 0.000000000000000003 ETH
// (Token amount credited — extremely small, likely for demo/testing)
