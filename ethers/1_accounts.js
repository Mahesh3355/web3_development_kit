// Import the ethers.js library
const { ethers } = require("ethers");

// Your Infura Project ID (get one for free from https://infura.io/)
// This is required to connect to the Ethereum network via Infura's RPC endpoint
const INFURA_ID = ''; // <-- Replace with your actual Infura Project ID

// Create a connection to the Ethereum mainnet via Infura's JSON-RPC endpoint
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

// Ethereum wallet address whose balance we want to check
const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e';

/**
 * Asynchronous function to check the ETH balance of the given address.
 * Uses the provider to fetch balance in Wei, then converts it to ETH.
 */
const check_balance = async () => {
  try {
    // Fetch balance in Wei (smallest unit of ETH)
    const Balance = await provider.getBalance(address);

    // Convert balance from Wei to ETH (for readability)
    const balanceInEth = ethers.utils.formatEther(Balance);

    // Log the result to the console
    console.log(`\nEth Balance of ${address} --> ${balanceInEth} ETH\n`);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

// Execute the function
check_balance();

/**
 * Example Output:
 * Eth Balance of 0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e --> 6.949533404898927 ETH
 * 
 * This script:
 * 1. Connects to Ethereum mainnet using Infura.
 * 2. Retrieves the account balance for the specified address.
 * 3. Formats and displays the balance in ETH.
 */


