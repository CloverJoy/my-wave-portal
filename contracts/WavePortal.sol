// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("gm! stay hydrated and keep inviting your friend to discord server");
    }

    function wave() public {
      totalWaves += 1;
      console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
      console.log("We have %d total waves!", totalWaves);
      return totalWaves;
    }
}
