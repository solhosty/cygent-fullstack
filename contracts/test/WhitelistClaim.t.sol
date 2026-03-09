// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {WhitelistClaim} from "src/WhitelistClaim.sol";

contract WhitelistClaimTest is Test {
    WhitelistClaim internal claimContract;

    address internal owner = address(this);
    address internal alice = address(0xA11CE);
    address internal bob = address(0xB0B);
    address internal eve = address(0xE111);

    function setUp() external {
        claimContract = new WhitelistClaim();
    }

    function testOwnerCanAddAndRemoveWhitelist() external {
        claimContract.addToWhitelist(alice);
        assertTrue(claimContract.whitelist(alice));
        assertEq(claimContract.whitelistCount(), 1);

        claimContract.removeFromWhitelist(alice);
        assertFalse(claimContract.whitelist(alice));
        assertEq(claimContract.whitelistCount(), 0);
    }

    function testNonOwnerCannotManageWhitelist() external {
        vm.prank(alice);
        vm.expectRevert("Not owner");
        claimContract.addToWhitelist(bob);

        claimContract.addToWhitelist(bob);
        vm.prank(alice);
        vm.expectRevert("Not owner");
        claimContract.removeFromWhitelist(bob);
    }

    function testClaimSuccessAndDoubleClaimBlocked() external {
        claimContract.addToWhitelist(alice);
        claimContract.deposit{value: 1 ether}();

        uint256 beforeBalance = alice.balance;
        vm.prank(alice);
        claimContract.claim();

        assertEq(alice.balance, beforeBalance + claimContract.CLAIM_AMOUNT());
        assertTrue(claimContract.claimed(alice));
        assertEq(claimContract.totalClaimedCount(), 1);
        assertEq(claimContract.totalClaimedAmount(), claimContract.CLAIM_AMOUNT());

        vm.prank(alice);
        vm.expectRevert("Already claimed");
        claimContract.claim();
    }

    function testClaimFailsWhenNotWhitelisted() external {
        claimContract.deposit{value: 1 ether}();

        vm.prank(eve);
        vm.expectRevert("Not whitelisted");
        claimContract.claim();
    }

    function testClaimFailsWhenInsufficientBalance() external {
        claimContract.addToWhitelist(alice);

        vm.prank(alice);
        vm.expectRevert("Insufficient ETH");
        claimContract.claim();
    }

    function testOwnerDepositAndWithdrawFlows() external {
        claimContract.deposit{value: 2 ether}();
        assertEq(address(claimContract).balance, 2 ether);

        claimContract.withdraw(0.5 ether);
        assertEq(address(claimContract).balance, 1.5 ether);

        claimContract.withdrawAll();
        assertEq(address(claimContract).balance, 0);
    }

    function testNonOwnerCannotDepositOrWithdraw() external {
        vm.prank(alice);
        vm.expectRevert("Not owner");
        claimContract.deposit{value: 1 ether}();

        claimContract.deposit{value: 1 ether}();

        vm.prank(alice);
        vm.expectRevert("Not owner");
        claimContract.withdraw(0.1 ether);

        vm.prank(alice);
        vm.expectRevert("Not owner");
        claimContract.withdrawAll();
    }

    function testGetUserStatus() external {
        claimContract.addToWhitelist(alice);

        (bool isWhitelisted, bool hasClaimed, bool canClaimNow, uint256 amount) =
            claimContract.getUserStatus(alice);
        assertTrue(isWhitelisted);
        assertFalse(hasClaimed);
        assertTrue(canClaimNow);
        assertEq(amount, claimContract.CLAIM_AMOUNT());

        claimContract.deposit{value: 1 ether}();
        vm.prank(alice);
        claimContract.claim();

        (, hasClaimed, canClaimNow,) = claimContract.getUserStatus(alice);
        assertTrue(hasClaimed);
        assertFalse(canClaimNow);
    }

    function testWhitelistListReturned() external {
        claimContract.addToWhitelist(alice);
        claimContract.addToWhitelist(bob);

        address[] memory listed = claimContract.getWhitelist();
        assertEq(listed.length, 2);
        assertEq(listed[0], alice);
        assertEq(listed[1], bob);
    }

    function testTransferOwnership() external {
        claimContract.transferOwnership(alice);
        assertEq(claimContract.owner(), alice);

        vm.expectRevert("Not owner");
        claimContract.addToWhitelist(bob);

        vm.prank(alice);
        claimContract.addToWhitelist(bob);
        assertTrue(claimContract.whitelist(bob));
    }
}
