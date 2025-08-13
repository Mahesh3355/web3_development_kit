//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract MyContract{
    //state variable
    uint public myUnit=1;
    uint256 public myUnit256=1;
    int256 public myint=-1;
    string public mystring="iloveuzinal";
    bytes32 public myBytes32="Helllo,world";
    address public myAddress= 0x71C7656EC7ab88b098defB751B7401B5f6d8976F;
    struct Mystruct{
        uint256 myu;
        string mystringw;
    }
    Mystruct public mystruct=Mystruct(1,"Hello,World");
    //local varibales
    function getValue() public pure returns(uint) {
        uint value=1;
        return value;
    }
}