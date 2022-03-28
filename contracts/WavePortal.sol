// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalHydrated;

    constructor() {
        console.log("gm! stay hydrated and keep inviting your friend to discord server");
    }

    function hydrate() public {
      totalHydrated += 1;
      console.log("%s is hydrated!", msg.sender);
    }

    function getTotalHydrated() public view returns (uint256) {
      console.log("We have %d total hydrated!", totalHydrated);
      return totalHydrated;
    }
}
