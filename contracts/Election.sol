// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Define a smart contract for managing elections
contract Election {
    using SafeMath for uint256;

    address public owner;
    bool public isVotingOpen;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        address ethereumAddress; // Ethereum address of the candidate
        string email;           // Email ID of the candidate
        string mobileNumber;    // Mobile Number of the candidate
        uint256 dateOfBirth;    // Date of Birth of the candidate
        string aadharNumber;    // Aadhar Card Number of the candidate
        string voterId;    // Voter ID Number of the candidate
        string homeAddress;   //Home Address of the Candidate
        string ipfsImageHash; // Store IPFS hash of candidate's image
    }

    struct Voter {
        address ethereumAddress;
        string name;
        string email;
        string mobileNumber;
        string voterId;
        string ipfsImageHash;
        bytes32 passwordHash;
        bool isRegistered;
    }

    struct Admin {
        string name;
        string email; 
        address ethereumAddress;
        bool isAdmin;
    }

    Candidate[] public candidates;
    mapping(address => bool) public candidatesRegistered;

    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public userVote;

    mapping(address => Voter) public voters;
    address[] public registeredVoters;

    mapping(address => Admin) public admins;
    address[] public adminAccounts;

    event NewCandidate(
        uint256 candidateId,
        string name,
        address ethereumAddress,
        string email,
        string mobileNumber,
        uint256 dateOfBirth,
        string aadharNumber,
        string voterId,
        string homeAddress,
        string ipfsImageHash
    ); 

    event VoterRegistered(
        string name,
        address voterAddress,
        string email,
        string mobileNumber,
        string voterId,
        string ipfsImageHash
    );

    event VoterLoggedIn(address indexed voterAddress);
    event Voted(address indexed voter, uint256 candidateId);
    event ElectionClosed();
    event ElectionOpen();
    event ElectionResultDeclared(string winnerName, uint256 winnerVoteCount);

    constructor() {
        owner = msg.sender;
        isVotingOpen = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender].isAdmin, "Only administrators can perform this action.");
        _;
    }

    modifier votingOpen() {
        require(isVotingOpen, "Voting is closed.");
        _;
    }

    modifier votingClose() {
        require(!isVotingOpen, "Can not register when Election is running");
        _;
    }

    function addAdmin(address _adminAddress, string memory _name, string memory _email) public onlyOwner {
        require(!admins[_adminAddress].isAdmin, "Admin already exists.");
        admins[_adminAddress] = Admin({
            name: _name,
            email: _email,
            ethereumAddress: _adminAddress,
            isAdmin: true
        });
        adminAccounts.push(_adminAddress);
    }


    function addCandidate(
        string memory _name,
        address _ethereumAddress,
        string memory _email,
        string memory _mobileNumber,
        uint256 _dateOfBirth,
        string memory _aadharNumber,
        string memory _voterId,
        string memory _homeAddress,
        string memory _ipfsImageHash
    ) public  votingClose {
        require(!candidatesRegistered[_ethereumAddress], "Voter is already registered.");
        uint256 candidateId = candidates.length + 1;
        candidates.push(
            Candidate(
                candidateId,
                _name,
                0,
                _ethereumAddress,
                _email,
                _mobileNumber,
                _dateOfBirth,
                _aadharNumber,
                _voterId,
                _homeAddress,
                _ipfsImageHash
            )
        ); // Store additional candidate info
        candidatesRegistered[_ethereumAddress]=true;
        emit NewCandidate(
            candidateId,
            _name,
            _ethereumAddress,
            _email,
            _mobileNumber,
            _dateOfBirth,
            _aadharNumber,
            _voterId,
            _homeAddress,
            _ipfsImageHash
        ); // Include additional info in the event

        
    }

    // Function to register a voter with a hashed password
    function registerVoter(
        string memory _name,
        address _ethereumAddress,
        string memory _email,
        string memory _mobileNumber,
        string memory _voterId,
        string memory _ipfsImageHash,
        string memory _password // Accept the plain password
    ) public {
        require(!voters[_ethereumAddress].isRegistered, "Voter is already registered.");

        // Hash the provided password using a hashing function (e.g., keccak256)
        bytes32 passwordHash = hashPassword(_password);

        voters[_ethereumAddress] = Voter(
            _ethereumAddress,
            _name,
            _email,
            _mobileNumber,
            _voterId,
            _ipfsImageHash,
            passwordHash, // Store the hashed password
            true
        );
        registeredVoters.push(_ethereumAddress);
        emit VoterRegistered(
            _name,
            _ethereumAddress,
            _email,
            _mobileNumber,
            _voterId,
            _ipfsImageHash
        );
    }

    // Function to hash a password using keccak256 or another suitable hashing function
    function hashPassword(string memory _password) internal pure returns (bytes32) {
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        return passwordHash;
    }

    function isVoterRegistered(address _ethereumAddress) public view returns (bool) {
        return voters[_ethereumAddress].isRegistered;
    }


    // Function to log in a voter with a password check
    function loginVoter(string memory _email, string memory _password, address _ethereumAddress) public {
        require(voters[_ethereumAddress].isRegistered, "Voter is not registered.");

        Voter memory voter = voters[_ethereumAddress];

        // Hash the provided password and compare it to the stored password hash
        require(
            (keccak256(abi.encodePacked(_password)) == voter.passwordHash) && (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(voter.email))),
            "Incorrect password"
        );

        emit VoterLoggedIn(_ethereumAddress);
    }

    function vote(uint256 _candidateId, address _ethereumAddress) public votingOpen {
        require(!hasVoted[_ethereumAddress], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidates.length, "Invalid candidate ID.");
        
        hasVoted[_ethereumAddress] = true;
        userVote[_ethereumAddress] = _candidateId;
        candidates[_candidateId - 1].voteCount++;
        emit Voted(_ethereumAddress, _candidateId);
    }

    function openElection() public onlyOwner {
        isVotingOpen = true;
        emit ElectionOpen();
    }

    function closeElection() public onlyOwner {
        isVotingOpen = false;
        emit ElectionClosed();
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory name, string memory email, string memory mobileNumber, uint256 dateOfBirth, string memory homeAddress) {
        require(_candidateId > 0 && _candidateId <= candidates.length, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId - 1];
        return (candidate.name, candidate.email, candidate.mobileNumber, candidate.dateOfBirth, candidate.homeAddress);
    }

    function getWinner() public view returns (Candidate memory winner) {
        require(!isVotingOpen, "Election is still open.");
        uint256 winningVoteCount = 0;
        uint256 winningCandidateId;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = candidates[i].id;
            }
        }
        winner = candidates[winningCandidateId - 1];
        return winner;
    }

    function declareElectionResult() public onlyOwner {
        require(!isVotingOpen, "Cannot declare result while voting is open.");

        uint256 winningVoteCount = 0;
        uint256 winningCandidateId;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = candidates[i].id;
            }
        }
        // Candidate memory winner = candidates[winningCandidateId - 1];
        Candidate memory winner = getWinner();

        emit ElectionResultDeclared(winner.name, winner.voteCount);
    }
}
