// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWhitelistClaim {
    event Claimed(address indexed account, uint256 amount);
    event Deposited(address indexed from, uint256 amount);
    event MerkleRootUpdated(bytes32 indexed previousRoot, bytes32 indexed newRoot);
    event ClaimAmountUpdated(uint256 previousAmount, uint256 newAmount);

    function claim(bytes32[] calldata proof) external;
    function deposit() external payable;
    function setMerkleRoot(bytes32 newRoot) external;
    function setClaimAmount(uint256 newClaimAmount) external;
    function pause() external;
    function unpause() external;

    function merkleRoot() external view returns (bytes32);
    function claimAmount() external view returns (uint256);
    function claimed(address account) external view returns (bool);
}
