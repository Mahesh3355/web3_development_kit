// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Ownable{
    address public owner ;
    modifier onlyOwner(){
        require(msg.sender==owner,"must be owner");
        _;
    }
    constructor(){
        owner=msg.sender;
    }
}
contract SecretVault{
    string s;
    constructor(string memory _s){
        s=_s;
    }
    function gets() public view returns(string memory)
    {
        return s;
    }
}
contract Mycontract is Ownable{
    address sc;
    constructor(string memory _s){
        SecretVault _secretvault=new SecretVault(_s);
        sc=address(_secretvault);
        //where the super is call then the parent constructred is called 
        super;
    }
    function gets() public view onlyOwner returns(string memory)
    {
        return  SecretVault(sc).gets();
    }
}