// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WhitelistClaim {
    uint256 public constant CLAIM_AMOUNT = 0.01 ether;

    address public owner;
    mapping(address => bool) public whitelist;
    mapping(address => bool) public claimed;

    address[] private whitelistMembers;
    mapping(address => uint256) private whitelistIndexPlusOne;

    uint256 public totalClaimedCount;
    uint256 public totalClaimedAmount;

    uint256 private _reentrancyLock;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event WhitelistAdded(address indexed account);
    event WhitelistRemoved(address indexed account);
    event Claimed(address indexed account, uint256 amount);
    event Deposited(address indexed depositor, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier nonReentrant() {
        require(_reentrancyLock == 0, "Reentrancy");
        _reentrancyLock = 1;
        _;
        _reentrancyLock = 0;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }

    function addToWhitelist(address account) external onlyOwner {
        require(account != address(0), "Zero address");
        require(!whitelist[account], "Already whitelisted");

        whitelist[account] = true;
        whitelistMembers.push(account);
        whitelistIndexPlusOne[account] = whitelistMembers.length;

        emit WhitelistAdded(account);
    }

    function removeFromWhitelist(address account) external onlyOwner {
        require(whitelist[account], "Not whitelisted");

        whitelist[account] = false;

        uint256 indexPlusOne = whitelistIndexPlusOne[account];
        uint256 index = indexPlusOne - 1;
        uint256 lastIndex = whitelistMembers.length - 1;

        if (index != lastIndex) {
            address lastAccount = whitelistMembers[lastIndex];
            whitelistMembers[index] = lastAccount;
            whitelistIndexPlusOne[lastAccount] = index + 1;
        }

        whitelistMembers.pop();
        delete whitelistIndexPlusOne[account];

        emit WhitelistRemoved(account);
    }

    function claim() external nonReentrant {
        require(whitelist[msg.sender], "Not whitelisted");
        require(!claimed[msg.sender], "Already claimed");
        require(address(this).balance >= CLAIM_AMOUNT, "Insufficient ETH");

        claimed[msg.sender] = true;
        totalClaimedCount += 1;
        totalClaimedAmount += CLAIM_AMOUNT;

        (bool ok, ) = payable(msg.sender).call{value: CLAIM_AMOUNT}("");
        require(ok, "ETH transfer failed");

        emit Claimed(msg.sender, CLAIM_AMOUNT);
    }

    function deposit() external payable onlyOwner {
        require(msg.value > 0, "No ETH sent");
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Zero amount");
        require(address(this).balance >= amount, "Insufficient balance");

        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "ETH transfer failed");

        emit Withdrawn(owner, amount);
    }

    function withdrawAll() external onlyOwner nonReentrant {
        uint256 amount = address(this).balance;
        require(amount > 0, "No ETH available");

        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "ETH transfer failed");

        emit Withdrawn(owner, amount);
    }

    function getWhitelist() external view returns (address[] memory) {
        return whitelistMembers;
    }

    function whitelistCount() external view returns (uint256) {
        return whitelistMembers.length;
    }

    function canClaim(address user) external view returns (bool) {
        return whitelist[user] && !claimed[user];
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getUserStatus(address user)
        external
        view
        returns (bool isWhitelisted, bool hasClaimed, bool canClaim, uint256 amount)
    {
        isWhitelisted = whitelist[user];
        hasClaimed = claimed[user];
        canClaim = isWhitelisted && !hasClaimed;
        amount = CLAIM_AMOUNT;
    }
}
