//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract myarray{
    uint[] public a=[1,2,3];
    string[] public s=["one","two"];
    string[] public str;
    uint256[][] public array2D=[[1,2,3],[4,5,6]];
    function addvalue(string memory _value) public{
        str.push(_value);
    }
    function valuescount() public view returns(uint){
        return str.length;
    }
}