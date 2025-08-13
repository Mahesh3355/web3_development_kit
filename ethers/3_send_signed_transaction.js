// Import ethers.js library
const { ethers } = require("ethers");

// Infura project ID (required to connect to Ethereum network via Infura)
const INFURA_ID = '';

// Create a connection to the Sepolia Ethereum test network using Infura
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

// Ethereum addresses for the sender and receiver
const sender = '0xBa55C05DE72ceac30C1bF53c29Be89293b7D712A';
const receiver = '0x1fAAAbCd3dFcc72ca47eadBB5b793d4693936140';

// Private key of the sender (⚠ keep this secret in real projects — never hardcode in production)
const sender_private_key = '';

// Create a wallet object using sender's private key and the provider
// This wallet is capable of signing and sending transactions
const wallet = new ethers.Wallet(sender_private_key, provider);

const main = async () => {
  
  // STEP 1: Check initial balances
  const sender_balance = await provider.getBalance(sender);
  const receiver_balance = await provider.getBalance(receiver);

  console.log(`Sender balance before transaction: ${ethers.utils.formatEther(sender_balance)} ETH\n`);
  console.log(`Receiver balance before transaction: ${ethers.utils.formatEther(receiver_balance)} ETH\n`);

  // STEP 2: Create and send a transaction
  // This transaction sends 0.001 ETH from sender to receiver
  const tx = await wallet.sendTransaction({
    to: receiver,                                // Receiver's Ethereum address
    value: ethers.utils.parseEther("0.001")      // Amount in ETH (converted to Wei)
  });

  // STEP 3: Wait for the transaction to be confirmed (mined)
  await tx.wait();

  // Log the transaction details (hash, gas used, etc.)
  console.log(tx);

  // STEP 4: Check balances after transaction
  const sender_balance_after = await provider.getBalance(sender);
  const receiver_balance_after = await provider.getBalance(receiver);

  console.log(`Sender balance after transaction: ${ethers.utils.formatEther(sender_balance_after)} ETH\n`);
  console.log(`Receiver balance after transaction: ${ethers.utils.formatEther(receiver_balance_after)} ETH\n`);
};

// Run the main function
main();

  //output
//   sender balance before transaction:0.053968480170372

// Receiver balance before transaction: 0.001 ETH
// This is the account balance of the receiver before the transfer takes place.

// Transaction Object Details (Ethers.js formatted output):

// {
//   type: 2, // EIP-1559 transaction type (supports maxPriorityFeePerGas and maxFeePerGas)
//   chainId: 11155111, // Network chain ID (11155111 = Ethereum Sepolia Testnet)
//   nonce: 1, // Transaction count from sender's address (prevents replay attacks)
  
//   // Gas fee parameters for EIP-1559
//   maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true }, // Tip to miner (in wei)
//   maxFeePerGas: BigNumber { _hex: '0x5981f7d2', _isBigNumber: true }, // Maximum total gas fee per unit gas (in wei)
  
//   gasPrice: null, // Not used in EIP-1559 (replaced by maxPriorityFeePerGas + baseFee)
  
//   gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true }, // Maximum gas allowed for this transaction (0x5208 = 21000 gas units for a simple ETH transfer)
  
//   // Transaction hash — unique ID for the transaction
//   hash: '0x72fdb942fdb090525281d1df8098bb1b5d760e0498faa4dba70bb2dc9e69e465',
  
//   // Cryptographic signature parts
//   v: 0, // Recovery ID (used for ECDSA signature recovery)
//   r: '0xfd5d0787c72a2398b55ce355558e53fbb745fd1fd0030afae5720d97cf809a44', // First part of signature
//   s: '0x577d2b713c06922cec35cd2f03a65a5c70ad31e612fb805836219217b4f22dea', // Second part of signature
  
//   from: '0xBa55C05DE72ceac30C1bF53c29Be89293b7D712A', // Sender's Ethereum address
  
//   confirmations: 0, // Number of times the block containing this transaction has been confirmed
//   wait: [Function (anonymous)] // Function to wait until the transaction is mined
// }

// Sender balance before transaction: 0.052936960710533 ETH
// Balance of the sender's account before sending ETH.

// Receiver balance after transaction: 0.002 ETH
// New receiver balance after the ETH transfer is processed.

