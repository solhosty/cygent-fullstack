// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";

import {CygentToken} from "../src/CygentToken.sol";

contract DeployCygentToken is Script {
    function run() external returns (CygentToken deployed) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);
        deployed = new CygentToken(owner);
        vm.stopBroadcast();
    }
}
