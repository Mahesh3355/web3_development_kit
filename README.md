# Ethers.js Examples

A comprehensive collection of practical examples demonstrating how to use ethers.js for Ethereum blockchain interactions.

## 🚀 Technology Stack

- **JavaScript** - Core programming language
- **[Ethers.js v5](https://docs.ethers.io/v5/)** - Ethereum library for blockchain interactions
- **[Node.js](https://nodejs.org/en/)** - Runtime environment
- **[Infura](https://infura.io/)** - Ethereum node provider

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ethers_examples
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your Environment

Before running any examples, you'll need to:

- Get a free Infura Project ID from [https://infura.io](https://infura.io)
- Add your Infura Project ID to the respective script files
- For transaction examples, you'll need test ETH and private keys

## 📚 Examples Overview

- **Purpose**: Check ETH balance of any wallet address
- **Network**: Ethereum Mainnet
- **Required**: Infura Project ID
- **Run**: `node ethers/1_accounts.js`

### 2. **Smart Contract Reading** (`ethers/2_read_smart_contract.js`)

- **Purpose**: Read ERC20 token data (name, symbol, total supply, balance)
- **Network**: Ethereum Mainnet
- **Contract**: DAI Stablecoin (0x6B175474E89094C44Da98b954EedeAC495271d0F)
- **Required**: Infura Project ID
- **Run**: `node ethers/2_read_smart_contract.js`

### 3. **Transaction Sending** (`ethers/3_send_signed_transaction.js`)

- **Purpose**: Send ETH between accounts with signed transactions
- **Network**: Sepolia Testnet
- **Required**:
  - Infura Project ID
  - Sender's private key
  - Sender and receiver addresses
- **Run**: `node ethers/3_send_signed_transaction.js`

### 4. **Contract Writing** (`ethers/4_write_contract.js`)

- **Purpose**: Interact with smart contracts (deploy and write operations)
- **Network**: Kovan Testnet
- **Required**:
  - Infura Project ID
  - Account private key
- **Run**: `node ethers/4_write_contract.js`

### 5. **Token Transfers** (`ethers/5_write_contract.js`)

- **Purpose**: Transfer ERC20 tokens between accounts
- **Network**: Kovan Testnet
- **Required**:
  - Infura Project ID
  - Account private keys
  - Token contract address
- **Run**: `node ethers/5_write_contract.js`

### 6. **Event Streaming** (`ethers/5_contract_event_stream.js`)

- **Purpose**: Listen to smart contract events in real-time
- **Network**: Ethereum Mainnet
- **Required**: Infura Project ID
- **Run**: `node ethers/5_contract_event_stream.js`

### 7. **Block Inspection** (`ethers/6_inspecting_blocks.js`)

- **Purpose**: Analyze blockchain blocks and their transactions
- **Network**: Ethereum Mainnet
- **Required**: Infura Project ID
- **Run**: `node ethers/6_inspecting_blocks.js`

## 🔧 Configuration

### Infura Setup

1. Visit [https://infura.io](https://infura.io)
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Replace the empty `INFURA_ID` variable in each script

### Test Networks

- **Sepolia**: Used for ETH transfers (example 3)
- **Kovan**: Used for contract deployments and token transfers (examples 4, 5)
- **Mainnet**: Used for reading data (examples 1, 2, 6, 7)

## ⚠️ Security Notes

- **Never commit private keys** to version control
- Use environment variables for sensitive data in production
- Test on testnets before mainnet
- Keep your Infura Project ID private

## 📖 Learning Path

1. Start with **1_accounts.js** to understand basic blockchain queries
2. Move to **2_read_smart_contract.js** for smart contract interactions
3. Try **3_send_signed_transaction.js** for basic transactions
4. Explore **4_write_contract.js** and **5_write_contract.js** for advanced contract operations
5. Finish with **5_contract_event_stream.js** and **6_inspecting_blocks.js** for blockchain monitoring

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📄 License

This project is licensed under the ISC License.

## 🔗 Useful Links

- [Ethers.js Documentation](https://docs.ethers.io/v5/)
- [Infura Documentation](https://docs.infura.io/)
- [Ethereum Development Documentation](https://ethereum.org/developers/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
