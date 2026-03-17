// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {CygentToken} from "../src/CygentToken.sol";

contract CygentTokenTest is Test {
    CygentToken internal token;

    address internal owner = address(0xA11CE);
    address internal user = address(0xB0B);

    function setUp() public {
        vm.prank(owner);
        token = new CygentToken(owner);
    }

    function testOwnerCanMint() public {
        vm.prank(owner);
        token.mint(user, 1_000e18);

        assertEq(token.balanceOf(user), 1_000e18);
    }

    function testNonOwnerCannotMint() public {
        vm.prank(user);
        vm.expectRevert();
        token.mint(user, 1e18);
    }

    function testBurn() public {
        vm.startPrank(owner);
        token.mint(user, 500e18);
        vm.stopPrank();

        vm.prank(user);
        token.burn(100e18);

        assertEq(token.balanceOf(user), 400e18);
    }

    function testTransfer() public {
        vm.prank(owner);
        token.mint(owner, 100e18);

        vm.prank(owner);
        bool didTransfer = token.transfer(user, 25e18);
        assertTrue(didTransfer);

        assertEq(token.balanceOf(user), 25e18);
    }
}
