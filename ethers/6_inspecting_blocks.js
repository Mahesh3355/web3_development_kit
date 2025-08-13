// Import the ethers.js library
const { ethers } = require("ethers");

// Your Infura Project ID (required for accessing Ethereum nodes)
const INFURA_ID = ''; // <-- Replace with your actual Infura Project ID

// Create a JSON-RPC provider to connect to the Ethereum Mainnet via Infura
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const main = async () => {
    // 1️⃣ Fetch the latest block number
    const blocknumber = await provider.getBlockNumber();
    console.log(`Block Number: ${blocknumber}\n`);

    // 2️⃣ Fetch detailed information about the latest block
    const blockinfo = await provider.getBlock(blocknumber);
    console.log(blockinfo);

    /**
     * blockinfo object typically includes:
     * {
     *   hash: string,                // Block hash
     *   parentHash: string,           // Hash of the previous block
     *   number: number,               // Block number
     *   timestamp: number,            // Unix timestamp when block was mined
     *   miner: string,                // Address of the miner
     *   difficulty: BigNumber,        // Mining difficulty
     *   gasLimit: BigNumber,          // Max gas allowed in block
     *   gasUsed: BigNumber,           // Gas actually used
     *   baseFeePerGas: BigNumber,     // Base gas fee (EIP-1559)
     *   transactions: string[],       // Array of transaction hashes
     *   ...more fields
     * }
     */

    // 3️⃣ Fetch the latest block with **full transaction details** instead of just hashes
    const { transactions } = await provider.getBlockWithTransactions(blocknumber);

    console.log("Logging first transaction in the block:\n");
    console.log(transactions[0]);

    /**
     * A transaction object typically includes:
     * {
     *   hash: string,                 // Transaction hash
     *   from: string,                 // Sender address
     *   to: string,                   // Receiver address (null if contract creation)
     *   nonce: number,                // Sender's transaction count
     *   gasLimit: BigNumber,          // Gas limit for this transaction
     *   gasPrice: BigNumber,          // Gas price in wei (null if EIP-1559)
     *   maxPriorityFeePerGas: BigNumber, // Max priority fee (EIP-1559)
     *   maxFeePerGas: BigNumber,      // Max total fee (EIP-1559)
     *   value: BigNumber,             // ETH value sent
     *   data: string,                 // Input data (empty for simple transfers)
     *   chainId: number,              // Network chain ID
     *   blockNumber: number,          // Block number containing tx
     *   transactionIndex: number,     // Position in block
     *   r, s, v: string/number,       // Signature parts
     *   type: number                  // Transaction type (0 = Legacy, 2 = EIP-1559)
     * }
     */
}

main();

//output
//  6_inspecting_blocks.js
// Block Number: 23134381

// {
//   hash: '0x1c3d8a9527702a98a737ad46d1a0592f30fcbff147d4376a7b5823cd85a35367',
//   parentHash: '0xa06030bfae4344680762383881715acc8c549abc7e7bb0c15399fd80e9fb52d9',
//   number: 23134381,
//   timestamp: 1755115223,
//   nonce: '0x0000000000000000',
//   difficulty: 0,
//   gasLimit: BigNumber { _hex: '0x02aea540', _isBigNumber: true },      
//   gasUsed: BigNumber { _hex: '0x01c52fcd', _isBigNumber: true },       
//   miner: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
//   extraData: '0x546974616e2028746974616e6275696c6465722e78797a29',     
//   transactions: [
//     '0x00905dd9b7d5ff15d23658e28b607b793a8c5b814045a70050eaa8cc784c4980',
//     '0x508ed8cd491325eb0d479438effea154083f39d64c36ee6a10598671945de610',
//     '0x07397ff52eba238a66538fa0367dd107688a213d6715b1b10ff665163d147ccc',
//     '0xba64fc1335c308fb1bc555f1ea7ea9079f8bbd66fc05e3fbde42d536f0f6721c',
//     '0xc055322d84a8f2f129baf4c16d4ad681875b6cab42122a59752037388340f25e',
//     '0x624b46e3e2932143cc2360d358b9e169c4d79fcd07cc1fd9a7dc5b335200ff1a',
//     '0xe1054ae75784fab3899644e5d20ea0562f224ff2fd0fc81a21da60bf63e41310',
//     '0xcd9fdbff4b0bf5e344027a8cca7479d06175badb406b66e3cfd8c9d01576e412',
//     '0x02bc13e1d5696d68927a23955682060c0715e5b96a12fdeeb445090fae17a279',
//     '0xeb3f0f3b2b8f7fcf65d5fed24b993c44fc6dce317b10ac24b6e1e55f1a639a1b',
//     '0xecfa2f02a3917169187e80427fb210386864dd278f94f1295f57763749172e33',
//     '0xb1a922dcdd1504d7d0c221d4d0987f5ebfbc70346558c82c9af9bc5faedd9432',
//     '0x485b48e0b00ac172cfb27b3827ee86c10190a600fa538a1d929a365758ba92c4',
//     '0x6355be0d420467b56debd7588f17101721c0acafcddfaeae2dc8b4f642dbd580',
//     '0xb1a529575e2a24f0efff62fa17ebc45788cc95f69bbbd567426c6a44f01e3248',
//     '0xfe5f88ad04090f40877830bbd0286036a5fd5f4b3cacf8a5a57cb2bb09544a9c',
//     '0x6dcd9ebda2fa396ea9ebf9fbe8601f7459033bdd3364117e9648ee407d96d8de',
//     '0x889a9fb93de411156100cbd362b65aeb43656aeeac6c4ac0e4a1dfedc8bdee61',
//     '0x4828a00c0cc65fdba9988ea667fa50f7caa021f6d0c3dd92fb7485115a4697ef',
//     '0x5c4fe91cb97055d801746934d59adb5090161a3491970181358e98e5178c8b8a',
//     '0x9c9476b04cb0216acb453ff4080b9151c698987f604a7a8905c8f9dbcc9874e6',
//     '0xacea99a3607960e4f65b570944c8ffa7d123f2493223c108bc913be6125d4b8f',
//     '0x6902a341e0bd635d7161be5b1c1cbbf56b420197d49942573121b60b982d2521',
//     '0xc1790179f259a1cbe227411d0ca16fd5db70e742831e6579e260711fd79869d7',
//     '0xe0a2bee05febe391b82edc49fc140ace87ae7378b55122c50c20a5532e5f3625',
//     '0xf6e343527e4b4b21597e528b448354d0bf69eb41198eec4e318e7e3162f13d24',
//     '0x9aa4f7c23b42795d13240f03c22f7ff189c191ae9f0db9eb7e09c38416fb5576',
//     '0x9288ca862a3a5afc0cfd25f07a646b8cffab9e1c0b198e7acbc9925a038c6527',
//     '0x4c365a8269255a8500acf2e456ab74cd21f53a1a260ad17fdadc029e53bb255a',
//     '0xc70e8c55491150efa910a506dd47b072d77fa5b9b64821f0f25ef3ed654458d9',
//     '0x5f4749240da1622e4d808847e6c3db8fbd542fdfb687b46db0803e6fc2d56f44',
//     '0xc7c175eac34d124940d64426b7a6786e69b660af21ff435ec2b39111587e51b6',
//     '0xae616dedc029c7a011c6a945d3fc948d39249e6283d2f80342458df670336161',
//     '0xb5a7061d63041cd4ff0ad38ff4658605dfa1b9d5e49eb09f168a307c3ad1e79a',
//     '0xcc7649aa8f1d6c07f73e93d335803cfec392b199bc2475a233ab198c8398b37e',
//     '0xb44ff620bd507ce8f2f19f1ad1e8ff259d3dc504faa25984be82d003d4f0ce04',
//     '0xd91174e0835395567b47807fa7b44f1f2921ffb8b3f273f55f8d11470938fa2d',
//     '0xbd09d535703d61d0866ebe1c337fb2ef6e7e8041d2ca946dd4156fa164466089',
//     '0xd47f68c74f093d16ab4d494a434649b9c64250e708c4ced362539c2e09bdf5bb',
//     '0x5aa87705b7766ea90637b6e8a8d75234ad968fb2cd94dcf96500aa63b9f388bd',
//     '0x6f8da69b385d7147c4da940961f72193217ddf18b3f25ad3730405a2ce1d0eb9',
//     '0x71587a12404bda1d181086c5cf4a174da30b360054ed1452159ec8ab743874b7',
//     '0x2cbb1b111f1e5ca4433df4aee76ab6f45dcdc76be3fd9a283c0b58b01a5cb2fa',
//     '0x08237e5af0a2e55fa8b90e3bacefe68436b2c5615ed813c73d07c1f4115ccc9c',
//     '0xac6e19163f62c01c5856ae0484cb0648664bafeaea7e37f2549b4ecc6d76b0bd',
//     '0x203007380dbb348ac79ce151351fd5055ae4315401965f06c1aff67161220c1d',
//     '0x72f9980e6610fd483c513346f8cde292c07a4ecf1e00078eef7a1c3b5dd06e1e',
//     '0xcd8b63b40fcf5dd48ecd76ca0b75316138737a9f8ff61ace4b89e6db76dd7812',
//     '0xe4ec09cdf60a22e98e9683d8dc61a67bf55663a8868431d43daa97428072fd68',
//     '0xa7deb6c39a656705ab152ecd2ca5e609e5ca1d8d3e51234e060a1b108ff3a768',
//     '0xfd43820aa1f374471ed4001fe5c60f7480425ec2ed07c9a6b12569cc1a86b5a0',
//     '0x71471c5e0c7c44feb473ad3d6aaea5f72ff858a073a98eefca47036ab4940b9f',
//     '0x966c7d2910b41e4303e00bb2c4ff6d5d4dacdef05a7e6bd7fd31037739c3b675',
//     '0x7f4f85b5d43760eb36b622de838e11cab3f674c1722a7b8a42efd7c050f81818',
//     '0x40d9baae760450d92d1bb61cc0f2ac739288f69a7887fb4ea55b495686db0ec9',
//     '0xe206ea0f2a116f2300b3396407699a96f92d180cd94b6ec3387ead0c387420bc',
//     '0xf325cf8bf3c23fbf3d2b08618710d4c8c26510c88e4123716bd307cbaecc4271',
//     '0x0449351465fe2654bc18d8a2c4ab1e26d2b14841f04e571e0fee81e20b0845b7',
//     '0x0017e01ac65b2e9a402595fc9fd6ae52131d34e92a0f6d4f09c7bbc66cd763a2',
//     '0xc33070cbafced5da1db3182dc83f190cf1967e02ee908f6663b7c3524bec348b',
//     '0x8ed6f1eaa5e1bd4330408e59f1bb3910c89645b76b8f2154a47b75cf9511626e',
//     '0xb74eb4037aa1e67837a303004d29f9cbc366293d58a092ebd89cce20bb145631',
//     '0xc6cb58820f2dc874e89bb6c8585d291b45a1fcb0af3b88cf132740e7d3323a8a',
//     '0xbd896721e755b00a5a28baba1d6cb456c1270d287a7be0de7c12a9479189d3b0',
//     '0x04dd100be917a88dbfa656359e9b76aa7ab6e2a50ca233004aaf42b921ffecf9',
//     '0xb493b4d81243dd6e4b05f5b5c26a490d7b1152ff8d6e3610351326adbfd0a97e',
//     '0x6f6b37740d88191365ee658d08a48c7bccad740e7e80341c7202b0ac93923b05',
//     '0x22094bef878235a57a2de10c418b73ceecbda55b4b4fd6dcc7145b0ac2a84e2b',
//     '0x1594c1447f83546d39d0a1ef6bbcb65c490ded683efb2d97558a6daf0d6d30dd',
//     '0x5a092e844c17b445130f56b3650c7d2c131e8682bcf6a15cca4ba45cb070c9de',
//     '0xeecdfd3936f049c3086ff6ee16fe0fa9602e242b3c6e0cc27cd7ef8c6454c2d8',
//     '0x3c6e92b9e05de913ed24673d6b32cf95aa5410f6d6617fa8f555a84053acdc4f',
//     '0x7e3e02a9d3cb815c210cea59af4fba8c361f28b8ed7c2d9c4f04bd7351b4229e',
//     '0x80f72f8925671b4e86886c5c9e8270bf1cc0ddb66d11bc35757f5ea0a1e908be',
//     '0x654dc8656b4d453fb13d4e6e12397a7c3634e4b640668cfaeda994a0f56ea472',
//     '0xccd0fa53c275e2f75bf290a4bacac49d9e14c3e1d6373001b68f137c74816944',
//     '0x1ccc409065ae3dea7aca124f91970760d8ff00c0606624c10b61f7d15c977acd',
//     '0x9280004db33a0928169dc57f353308595a9cdab173d46a96c72dc29fceae7806',
//     '0xbbd0b94d45fbc5fee31c6823e2453e2a963d88b981cc0c259fa14fed224b14f2',
//     '0x576713f6feec55c1d25168ad3917d2aa2918c0a6305216ef79e409d02276271c',
//     '0xea6705458215f0820fa910163e2a9f270b6ca7b1f62af05422734d0b2cb1338b',
//     '0x584a9e0ef215a27810f25a50d5bc2cf3e900bbce4157aa5e3cd8ee3a58b7c7f0',
//     '0xa35e0edc6c37cbc1a6486b20bfe4add717bc2d4791509efdd2f6876b32c8526c',
//     '0xa6139edd5fb2b3ee7e995829d328b4d8f8f5f93513b4f9e94f0deae554b61959',
//     '0xd5824e93fbfe6a20147c5448dddf04b07c468db392c531a1ef6b5e8e00d8db53',
//     '0x179f8b7c7c02d67431da059576564be4c581de6516af91a7fdf3d2e11353760e',
//     '0x083f93b012a49dd502282f6ea3c025042b51f448203b3b0b6bc5fbc2117afda4',
//     '0x45038739114ca2ef71a064af2f46c924f5b0a12c85e2e7d8262b0dd6296fcc5b',
//     '0x5996ecf7a7b9e96c9781f5e68df9f64ac13760f420b779d4e271e295939f3ed3',
//     '0x3e970a69be05c047b2230095d9057032c4502a40265ae18dc7df22c8c2846a35',
//     '0x21d31a8931ba2c45373b9d62bb225aca0202b488f75a0423be9a6662c707c1a9',
//     '0x808cd4c2deb48062e261ea9e0fd4cc5ed0ec81202dd454e7c894c895970b575d',
//     '0x27a4ce5d3a8cdb205a5fffb9bbf5347170b3255b9ac060ac3466867d1e6f247c',
//     '0x6b16e11a195b8a22f511cae42ce8ae311dd4d0eedcdca674758ae7525b12cd5b',
//     '0x5e6243c205c894fe5937f12178ca00da2a0bb5faa317b07171b29bd0ce7c9377',
//     '0x93d0599f87022cecc44611598a6174e8c9c950c8022c9e678917f1d90f760e8b',
//     '0x8e4054dbd7c98432a464e582e9333e78993521957ba9e84bffaacf19fad946b9',
//     '0xaa7951ec9e3d6081c0f5bf21e700864858c45de4df7f707c534917dc2abdfb9f',
//     '0xa5b2202df1f4e1524ab8c8ef8e0087753a0d9aa94d928a17485db4daa45a6fbe',
//     '0x6e8686db01d6c5b840ef7c418c371e8f61b0501eaf4d3d148a99726adcf732b7',
//     ... 284 more items
//   ],
//   baseFeePerGas: BigNumber { _hex: '0x51336e8f', _isBigNumber: true }, 
//   _difficulty: BigNumber { _hex: '0x00', _isBigNumber: true }
// }
// looging first transction in the block

// {
//   hash: '0x00905dd9b7d5ff15d23658e28b607b793a8c5b814045a70050eaa8cc784c4980',
//   type: 2,
//   accessList: [],
//   blockHash: '0x1c3d8a9527702a98a737ad46d1a0592f30fcbff147d4376a7b5823cd85a35367',
//   blockNumber: 23134381,
//   transactionIndex: 0,
//   confirmations: 1,
//   from: '0xae2885E0E7A6c5f99b93B4dBC43D206C7cf67c7E',
//   gasPrice: BigNumber { _hex: '0x51336e90', _isBigNumber: true },      
//   maxPriorityFeePerGas: BigNumber { _hex: '0x01', _isBigNumber: true },
//   maxFeePerGas: BigNumber { _hex: '0x0ba43b7400', _isBigNumber: true },
//   gasLimit: BigNumber { _hex: '0x0f4240', _isBigNumber: true },        
//   to: '0xae2885E0E7A6c5f99b93B4dBC43D206C7cf67c7E',
//   value: BigNumber { _hex: '0x07', _isBigNumber: true },
//   nonce: 3118,
//   data: '0x',
//   r: '0x86d0367f076d1c054f011b20cb92a771131404cf2b67cf2f10b8740fb63b4ee8',
//   s: '0x212903606754664604192dde810b79b30ec2ac6f2b1fe7d86401b19082d13f84',
//   v: 0,
//   creates: null,
//   chainId: 1,
//   wait: [Function (anonymous)]