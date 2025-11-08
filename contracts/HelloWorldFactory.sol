// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./HelloWorld.sol";
contract HelloWorldFactory {
    
    HelloWorld[] public helloWorldArray;

    function addHelloWorldContract() public {
        HelloWorld helloWorld = new HelloWorld(0,"xxc");
        helloWorldArray.push(helloWorld);
    }

    function setHelloWorldContract(uint256 _index,uint256 _count) public {
        helloWorldArray[_index].incrCount(_count);
    }

    function getHelloCount(uint256 _helloWorldIndex) public view returns (uint256,string memory) {
        HelloWorld hello = helloWorldArray[_helloWorldIndex];
        return (hello.count(),hello.name());
    }
}