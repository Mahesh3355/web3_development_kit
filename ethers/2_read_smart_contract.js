// Import the ethers.js library
const { ethers } = require("ethers");

// Your Infura Project ID (get it from https://infura.io)
const INFURA_ID = '';

// Create a connection to the Ethereum mainnet using Infura as the JSON-RPC provider
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

// Minimal ABI (Application Binary Interface) for interacting with an ERC20 token
// We only define the functions we need to read: name, symbol, totalSupply, balanceOf
const ERC20_ABI = [
    "function name() view returns (string)",               // Get the token's name
    "function symbol() view returns (string)",             // Get the token's symbol
    "function totalSupply() view returns (uint256)",       // Get the total token supply
    "function balanceOf(address owner) view returns (uint256)", // Get the balance of a specific wallet
];

// Address of the DAI Stablecoin smart contract on Ethereum Mainnet
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

// Create a contract object to interact with the DAI token
// Parameters: contract address, ABI, and provider
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  // --- Reading data from the ERC20 smart contract ---

  // Fetch token name
  const name = await contract.name();

  // Fetch token symbol
  const symbol = await contract.symbol();

  // Fetch total supply (in smallest unit, e.g., wei for ETH, smallest DAI unit here)
  const totalSupply = await contract.totalSupply();

  console.log(`Reading smart contract from ${address}\n`);
  console.log(`Name of the token: ${name}\n`);
  console.log(`Symbol of the token: ${symbol}\n`);

  // Convert total supply from smallest unit to a human-readable format (18 decimals)
  console.log(`Total Supply of the token: ${ethers.utils.formatEther(totalSupply)}\n`);

  // Example: Check the token balance of a given Ethereum address
  const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700');

  // Convert balance to a readable format
  console.log(`Balance of the token for the given address: ${ethers.utils.formatEther(balance)}\n`);
};

// Run the main function
main();

//output
// reading smart contract form 0x6B175474E89094C44Da98b954EedeAC495271d0F

// Name of the token: Dai Stablecoin

// Symbol of the token: DAI

// Total Supply of the token: 3919567798.022657025006357865