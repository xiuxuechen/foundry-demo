// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {

    uint256 public count;

    string public name;

    constructor (uint256 _iniCount, string memory _name){
        count = _iniCount;
        name = _name;
    }

    function incrCount(uint256 _num) public virtual {
        count = count + _num;
    }
}