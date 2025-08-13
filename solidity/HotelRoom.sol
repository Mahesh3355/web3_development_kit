// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract HotelRoom{
   enum Status { Vacant, Occupied }
   Status public roomStatus;
    event Occupy(address _occupant,uint _value);
    address payable public owner;
    constructor()
    {
        owner=payable(msg.sender);
        roomStatus=Status.Vacant;
    }
    modifier onlywhilevacant{
        require(roomStatus==Status.Vacant,"Currently ocuupied");
        _;
    }
    modifier costs(uint _amount)
    {
        require(msg.value>=_amount,"Not enough ether provided");
        _;
    }
    function Book() public payable onlywhilevacant costs(2 ether) {
        roomStatus=Status.Occupied;
        // owner.transfer(msg.value);
        (bool sent,bytes memory data)=owner.call{value: msg.value}("");
        require(sent);
        emit Occupy(msg.sender, msg.value);
    }
}