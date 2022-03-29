// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalHydrated;
    uint256 private seed;

    event NewHydrated(address indexed from, uint256 timestamp, string message);

    struct Hydrated {
      address hydratee;
      string message;
      uint256 timestamp;
    }

    Hydrated[] hydratees;

    mapping(address => uint256) public lastHydratedAt;

    constructor() payable {
        console.log("hello blockchain!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function hydrate(string memory _message) public {

      require(lastHydratedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
      lastHydratedAt[msg.sender] = block.timestamp;
      totalHydrated += 1;
      console.log("%s is hydrated! w/ message %s", msg.sender, _message);
      hydratees.push(Hydrated(msg.sender, _message, block.timestamp));

      seed = (block.difficulty + block.timestamp + seed) % 100;

      console.log("Random # generated: %d", seed);
      if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
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
