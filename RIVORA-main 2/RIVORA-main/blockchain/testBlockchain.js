require("dotenv").config();

const { ethers } = require("ethers");

const RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.RIVORA_CONTRACT_ADDRESS;

const ABI = [
  "function verifyDocument(bytes32 recordId, bytes32 documentHash) external",
  "function getDocumentVerification(bytes32 recordId) external view returns (bytes32 documentHash, address verifier, uint256 timestamp)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    wallet
  );

  const recordId = ethers.id("RIVORA-TEST-001");
  const documentHash = ethers.sha256(
    ethers.toUtf8Bytes("RIVORA test medical document")
  );

  console.log("Sending verification to blockchain...");

  const tx = await contract.verifyDocument(
    recordId,
    documentHash
  );

  console.log("Transaction sent:");
  console.log(tx.hash);

  const receipt = await tx.wait();

  console.log("Transaction confirmed!");
  console.log("Block:", receipt.blockNumber);

  const result = await contract.getDocumentVerification(recordId);

  console.log("\nBlockchain verification:");
  console.log("Document Hash:", result[0]);
  console.log("Verifier:", result[1]);
  console.log(
    "Timestamp:",
    new Date(Number(result[2]) * 1000).toLocaleString()
  );
}

main().catch((error) => {
  console.error("\nBlockchain test failed:");
  console.error(error);
});