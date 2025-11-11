// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./HelloWorld.sol";
contract ExtendHelloWorld is HelloWorld {
    
    uint256 public overrideCount;

    string public ovrrideName;

    constructor(uint256 _overrideCount, string memory _overrideName) HelloWorld(count, name){
        overrideCount = _overrideCount;
        ovrrideName = _overrideName;
    }

    function incrCount(uint256 _num) public override {
        overrideCount = overrideCount * _num;
    }
}