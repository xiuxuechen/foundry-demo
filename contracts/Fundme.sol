// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUsd, unicode"钱不够！");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    
}