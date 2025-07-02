// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract VotingSystem is Ownable, ReentrancyGuard {
    // Structs
    struct Candidate {
        uint256 id;
        string name;
        string party;
        string position;
        string imageHash;
        uint256 voteCount;
        bool isActive;
        uint256 registrationTime;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedFor;
        uint256 registrationTime;
    }

    struct Election {
        uint256 id;
        string name;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isCompleted;
        uint256 totalVotes;
        uint256 totalCandidates;
    }

    // State variables
    uint256 private _electionIds = 0;
    uint256 private _candidateIds = 0;
    
    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(uint256 => Candidate)) public candidates; // electionId => candidateId => Candidate
    mapping(address => Voter) public voters;
    mapping(uint256 => mapping(address => bool)) public hasVotedInElection; // electionId => voter => hasVoted
    
    uint256 public registrationFee = 0.01 ether;
    uint256 public candidateRegistrationFee = 0.05 ether;
    
    // Events
    event ElectionCreated(uint256 indexed electionId, string name, uint256 startTime, uint256 endTime);
    event CandidateRegistered(uint256 indexed electionId, uint256 indexed candidateId, string name, string party);
    event VoterRegistered(address indexed voter, uint256 registrationTime);
    event VoteCast(uint256 indexed electionId, address indexed voter, uint256 indexed candidateId);
    event ElectionCompleted(uint256 indexed electionId, uint256 totalVotes);
    event FeesUpdated(uint256 newRegistrationFee, uint256 newCandidateFee);

    // Modifiers
    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Voter not registered");
        _;
    }

    modifier electionExists(uint256 _electionId) {
        require(_electionId > 0 && _electionId <= _electionIds, "Election does not exist");
        _;
    }

    modifier electionActive(uint256 _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(block.timestamp >= elections[_electionId].startTime, "Election has not started");
        require(block.timestamp <= elections[_electionId].endTime, "Election has ended");
        _;
    }

    modifier candidateExists(uint256 _electionId, uint256 _candidateId) {
        require(_candidateId > 0 && _candidateId <= _candidateIds, "Candidate does not exist");
        require(candidates[_electionId][_candidateId].isActive, "Candidate is not active");
        _;
    }

    // Constructor
    constructor() Ownable(msg.sender) {
        // Initialize IDs to start from 1
        _electionIds = 1;
        _candidateIds = 1;
    }

    // Admin functions
    function createElection(
        string memory _name,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) external onlyOwner {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        
        uint256 electionId = _electionIds;
        elections[electionId] = Election({
            id: electionId,
            name: _name,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true,
            isCompleted: false,
            totalVotes: 0,
            totalCandidates: 0
        });
        
        _electionIds++;
        emit ElectionCreated(electionId, _name, _startTime, _endTime);
    }

    function registerCandidate(
        uint256 _electionId,
        string memory _name,
        string memory _party,
        string memory _position,
        string memory _imageHash
    ) external payable electionExists(_electionId) {
        require(msg.value >= candidateRegistrationFee, "Insufficient registration fee");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_party).length > 0, "Party cannot be empty");
        require(bytes(_position).length > 0, "Position cannot be empty");
        
        uint256 candidateId = _candidateIds;
        candidates[_electionId][candidateId] = Candidate({
            id: candidateId,
            name: _name,
            party: _party,
            position: _position,
            imageHash: _imageHash,
            voteCount: 0,
            isActive: true,
            registrationTime: block.timestamp
        });
        
        elections[_electionId].totalCandidates++;
        _candidateIds++;
        
        emit CandidateRegistered(_electionId, candidateId, _name, _party);
    }

    function updateFees(uint256 _registrationFee, uint256 _candidateFee) external onlyOwner {
        registrationFee = _registrationFee;
        candidateRegistrationFee = _candidateFee;
        emit FeesUpdated(_registrationFee, _candidateFee);
    }

    function completeElection(uint256 _electionId) external onlyOwner electionExists(_electionId) {
        require(block.timestamp > elections[_electionId].endTime, "Election has not ended yet");
        require(!elections[_electionId].isCompleted, "Election already completed");
        
        elections[_electionId].isActive = false;
        elections[_electionId].isCompleted = true;
        
        emit ElectionCompleted(_electionId, elections[_electionId].totalVotes);
    }

    // Voter functions
    function registerVoter() external payable {
        require(!voters[msg.sender].isRegistered, "Already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");
        
        voters[msg.sender] = Voter({
            isRegistered: true,
            hasVoted: false,
            votedFor: 0,
            registrationTime: block.timestamp
        });
        
        emit VoterRegistered(msg.sender, block.timestamp);
    }

    function vote(uint256 _electionId, uint256 _candidateId) 
        external 
        onlyRegisteredVoter 
        electionExists(_electionId) 
        electionActive(_electionId) 
        candidateExists(_electionId, _candidateId) 
        nonReentrant 
    {
        require(!hasVotedInElection[_electionId][msg.sender], "Already voted in this election");
        
        hasVotedInElection[_electionId][msg.sender] = true;
        candidates[_electionId][_candidateId].voteCount++;
        elections[_electionId].totalVotes++;
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = _candidateId;
        
        emit VoteCast(_electionId, msg.sender, _candidateId);
    }

    // View functions
    function getElection(uint256 _electionId) external view electionExists(_electionId) returns (Election memory) {
        return elections[_electionId];
    }

    function getCandidate(uint256 _electionId, uint256 _candidateId) 
        external 
        view 
        electionExists(_electionId) 
        returns (Candidate memory) 
    {
        require(_candidateId > 0 && _candidateId <= _candidateIds, "Candidate does not exist");
        return candidates[_electionId][_candidateId];
    }

    function getVoter(address _voter) external view returns (Voter memory) {
        return voters[_voter];
    }

    function getElectionResults(uint256 _electionId) 
        external 
        view 
        electionExists(_electionId) 
        returns (Candidate[] memory) 
    {
        uint256 candidateCount = elections[_electionId].totalCandidates;
        Candidate[] memory results = new Candidate[](candidateCount);
        
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[_electionId][i].isActive) {
                results[i - 1] = candidates[_electionId][i];
            }
        }
        
        return results;
    }

    function getActiveElections() external view returns (Election[] memory) {
        uint256 totalElections = _electionIds - 1;
        uint256 activeCount = 0;
        
        // Count active elections
        for (uint256 i = 1; i <= totalElections; i++) {
            if (elections[i].isActive) {
                activeCount++;
            }
        }
        
        Election[] memory activeElections = new Election[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalElections; i++) {
            if (elections[i].isActive) {
                activeElections[currentIndex] = elections[i];
                currentIndex++;
            }
        }
        
        return activeElections;
    }

    function getTotalElections() external view returns (uint256) {
        return _electionIds - 1;
    }

    function getTotalCandidates() external view returns (uint256) {
        return _candidateIds - 1;
    }

    // Withdraw functions
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Emergency functions
    function emergencyStopElection(uint256 _electionId) external onlyOwner electionExists(_electionId) {
        elections[_electionId].isActive = false;
    }

    function removeCandidate(uint256 _electionId, uint256 _candidateId) 
        external 
        onlyOwner 
        electionExists(_electionId) 
    {
        require(_candidateId > 0 && _candidateId <= _candidateIds, "Candidate does not exist");
        candidates[_electionId][_candidateId].isActive = false;
    }
} 