// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalHydrated;

    event NewHydrated(address indexed from, uint256 timestamp, string message);

    struct Hydrated {
      address hydratee;
      string message;
      uint256 timestamp;
    }

    Hydrated[] hydratees;

    constructor() {
        console.log("gm! stay hydrated and keep inviting your friend to discord server");
    }

    function hydrate(string memory _message) public {
      totalHydrated += 1;
      console.log("%s is hydrated! w/ message %s", msg.sender, _message);
      hydratees.push(Hydrated(msg.sender, _message, block.timestamp));
      emit NewHydrated(msg.sender, block.timestamp, _message);

    }

    function getAllHydratees() public view returns(Hydrated[] memory) {
      return hydratees;
    }

    function getTotalHydrated() public view returns (uint256) {
      console.log("We have %d total hydrated!", totalHydrated);
      return totalHydrated;
    }
}
