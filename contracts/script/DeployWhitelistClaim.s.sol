// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {WhitelistClaim} from "src/WhitelistClaim.sol";

contract DeployWhitelistClaim is Script {
    function run() external returns (WhitelistClaim deployed) {
        vm.startBroadcast();
        deployed = new WhitelistClaim();
        vm.stopBroadcast();

        console2.log("WhitelistClaim deployed at:", address(deployed));
    }
}
