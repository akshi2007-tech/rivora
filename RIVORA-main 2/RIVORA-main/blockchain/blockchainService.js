const { ethers } = require("ethers");

const RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.RIVORA_CONTRACT_ADDRESS;

const CONTRACT_ABI = [
  "function verifyDocument(bytes32 recordId, bytes32 documentHash) external",
  "function updateConsent(bytes32 consentId, bytes32 patientHash, bytes32 purposeHash, bool granted) external",
  "function getDocumentVerification(bytes32 recordId) external view returns (bytes32 documentHash, address verifier, uint256 timestamp)",
  "function getConsent(bytes32 consentId) external view returns (bytes32 patientHash, bytes32 purposeHash, bool granted, uint256 timestamp)"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  wallet
);

async function verifyDocument(recordId, documentHash) {
  const tx = await contract.verifyDocument(
    ethers.id(recordId),
    documentHash
  );

  const receipt = await tx.wait();

  return {
    transactionHash: receipt.hash,
    contractAddress: CONTRACT_ADDRESS
  };
}

async function updateConsent(
  consentId,
  patientHash,
  purposeHash,
  granted
) {
  const tx = await contract.updateConsent(
    ethers.id(consentId),
    ethers.id(patientHash),
    ethers.id(purposeHash),
    granted
  );

  const receipt = await tx.wait();

  return {
    transactionHash: receipt.hash,
    contractAddress: CONTRACT_ADDRESS
  };
}

module.exports = {
  verifyDocument,
  updateConsent
};