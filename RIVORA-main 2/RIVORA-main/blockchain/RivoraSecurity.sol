// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RivoraSecurity {

    struct Verification {
        bytes32 documentHash;
        address verifier;
        uint256 timestamp;
    }

    struct Consent {
        bytes32 patientHash;
        bytes32 purposeHash;
        bool granted;
        uint256 timestamp;
    }

    mapping(bytes32 => Verification) public verifications;
    mapping(bytes32 => Consent) public consents;

    event DocumentVerified(
        bytes32 indexed recordId,
        bytes32 documentHash,
        address indexed verifier,
        uint256 timestamp
    );

    event ConsentUpdated(
        bytes32 indexed consentId,
        bytes32 patientHash,
        bytes32 purposeHash,
        bool granted,
        uint256 timestamp
    );

    function verifyDocument(
        bytes32 recordId,
        bytes32 documentHash
    ) external {
        verifications[recordId] = Verification({
            documentHash: documentHash,
            verifier: msg.sender,
            timestamp: block.timestamp
        });

        emit DocumentVerified(
            recordId,
            documentHash,
            msg.sender,
            block.timestamp
        );
    }

    function updateConsent(
        bytes32 consentId,
        bytes32 patientHash,
        bytes32 purposeHash,
        bool granted
    ) external {
        consents[consentId] = Consent({
            patientHash: patientHash,
            purposeHash: purposeHash,
            granted: granted,
            timestamp: block.timestamp
        });

        emit ConsentUpdated(
            consentId,
            patientHash,
            purposeHash,
            granted,
            block.timestamp
        );
    }

    function getDocumentVerification(
        bytes32 recordId
    ) external view returns (
        bytes32 documentHash,
        address verifier,
        uint256 timestamp
    ) {
        Verification memory verification = verifications[recordId];

        return (
            verification.documentHash,
            verification.verifier,
            verification.timestamp
        );
    }

    function getConsent(
        bytes32 consentId
    ) external view returns (
        bytes32 patientHash,
        bytes32 purposeHash,
        bool granted,
        uint256 timestamp
    ) {
        Consent memory consent = consents[consentId];

        return (
            consent.patientHash,
            consent.purposeHash,
            consent.granted,
            consent.timestamp
        );
    }
}