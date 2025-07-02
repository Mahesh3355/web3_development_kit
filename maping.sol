// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract mappingTest{
    mapping(uint => string) public names;
    mapping(uint=>book) public books;
    struct book {
        string title;
        string author;
    }
    constructor(){
        names[1]="Zinal";
        names[2]="Mahesh";
        names[3]="HII";
    }
    function addBook(uint _id,string memory _title,string memory _author) public{
        books[_id]=book(_title,_author);
    }
    //nested mapping
    mapping(address =>  mapping(uint=>book)) public mybooks;
    function myBook(uint _id,string memory _title,string memory _author) public{
        mybooks[msg.sender][_id]=book(_title,_author);
    }

}