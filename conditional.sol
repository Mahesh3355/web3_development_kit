// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract condtional{
    uint[] public num=[1,2,3,4,5,6,7,8,9,10];
    address public owner;
    constructor()
    {
        owner=msg.sender;
    }
    function countevennumber() public  returns(uint){
        uint count=0;
        for(uint i=0;i<num.length;i++)
        {
            if(iseven(num[i]))
            {
                count++;
            }
        }
        return count;

    }
    function iseven(uint _number) public payable returns(bool){
        if(_number%2==0)
        {
            return true;
        }
        return false;
    }
    function isowner() public view returns(bool)
    {
        return owner==msg.sender;
    }
}