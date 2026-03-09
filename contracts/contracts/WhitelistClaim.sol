// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import {IWhitelistClaim} from "./IWhitelistClaim.sol";

contract WhitelistClaim is IWhitelistClaim, Ownable, Pausable, ReentrancyGuard {
    bytes32 public merkleRoot;
    uint256 public claimAmount;
    mapping(address => bool) public claimed;

    constructor(bytes32 initialMerkleRoot, uint256 initialClaimAmount) Ownable(msg.sender) {
        require(initialClaimAmount > 0, "Claim amount must be > 0");
        merkleRoot = initialMerkleRoot;
        claimAmount = initialClaimAmount;
    }

    function claim(bytes32[] calldata proof) external nonReentrant whenNotPaused {
        require(!claimed[msg.sender], "Already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        require(address(this).balance >= claimAmount, "Insufficient ETH");

        claimed[msg.sender] = true;

        (bool ok, ) = msg.sender.call{value: claimAmount}("");
        require(ok, "ETH transfer failed");

        emit Claimed(msg.sender, claimAmount);
    }

    function deposit() external payable onlyOwner {
        require(msg.value > 0, "No ETH sent");
        emit Deposited(msg.sender, msg.value);
    }

    function setMerkleRoot(bytes32 newRoot) external onlyOwner {
        bytes32 previousRoot = merkleRoot;
        merkleRoot = newRoot;
        emit MerkleRootUpdated(previousRoot, newRoot);
    }

    function setClaimAmount(uint256 newClaimAmount) external onlyOwner {
        require(newClaimAmount > 0, "Claim amount must be > 0");
        uint256 previousAmount = claimAmount;
        claimAmount = newClaimAmount;
        emit ClaimAmountUpdated(previousAmount, newClaimAmount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
