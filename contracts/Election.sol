// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Define a smart contract for managing elections
contract Election {
    using SafeMath for uint256;

    address public owner;
    bool public isVotingOpen;
    bool public resultsDeclared;

    struct Winner {
        uint256 id;
        string name;
        uint256 voteCount;
        address ethereumAddress; 
    }

    Winner public winner;

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
    }

    struct Voter {
        address ethereumAddress;
        string name;
        string email;
        string mobileNumber;
        string voterId;
        bytes32 passwordHash;
    }

    struct Admin {
        string name;
        string email; 
        address ethereumAddress;
        bool isAdmin;
    }

    struct IpfsHash {
        string faceHash; 
        string documentHash;
    }

    struct VoterRegistrationInfo {
        bool profileFilled;
        bool otpVerified; 
        bool faceRegistered;
        bool fullyRegistered;
    }

    struct CandidateRegistrationInfo {
        bool profileFilled;
        bool otpVerified; 
        bool faceRegistered;
        bool fullyRegistered;
    }

    Candidate[] public candidates;
    

    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public userVote;
    mapping(address => Voter) public voters;
    address[] public registeredVoters;
    mapping(address => IpfsHash) voterIpfsHash;
    mapping(address => VoterRegistrationInfo) voterInfo;

    mapping(address => bool) public candidatesRegistered;
    mapping(address => IpfsHash) candidateIpfsHash;
    mapping(address => CandidateRegistrationInfo) candidateInfo;

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
        string homeAddress
    ); 

    event VoterRegistered(
        string name,
        address voterAddress,
        string email,
        string mobileNumber,
        string voterId
    );

    event VoterLoggedIn(address indexed voterAddress);
    event Voted(address indexed voter, uint256 candidateId);
    event ElectionClosed();
    event ElectionOpen();
    event ElectionResultDeclared(string winnerName, uint256 winnerVoteCount);

    constructor() {
        owner = msg.sender;
        isVotingOpen = false;
        resultsDeclared = false;
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
        string memory _homeAddress
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
                _homeAddress
            )
        ); // Store additional candidate info
        candidatesRegistered[_ethereumAddress]=true;
        candidateInfo[_ethereumAddress].profileFilled = true;
        emit NewCandidate(
            candidateId,
            _name,
            _ethereumAddress,
            _email,
            _mobileNumber,
            _dateOfBirth,
            _aadharNumber,
            _voterId,
            _homeAddress
        ); // Include additional info in the event

        
    }

    function getVoterIpfsHash(address _ethereumAddress) public view returns (IpfsHash memory){
        return voterIpfsHash[_ethereumAddress];
    }

    function setVoterIpfsHash(address _ethereumAddress, string memory _facialHash, string memory _documentHash) public {
        
        voterIpfsHash[_ethereumAddress] = IpfsHash(_facialHash,_documentHash);
        voterInfo[_ethereumAddress].faceRegistered = true; 
        voterInfo[_ethereumAddress].fullyRegistered = true;
    }

    function getVoterInfo(address _ethereumAddress) public view returns (VoterRegistrationInfo memory){
        return voterInfo[_ethereumAddress];
    }

    function setVoterBasic(address _ethereumAddress) public {
        
        voterInfo[_ethereumAddress] = VoterRegistrationInfo(true,false,false,false);
    }

    function setVoterOtp(address _ethereumAddress) public {
        
        voterInfo[_ethereumAddress].otpVerified = true; 
    }

    function setVoterFace(address _ethereumAddress) public {
        
        voterInfo[_ethereumAddress].faceRegistered = true; 
        voterInfo[_ethereumAddress].fullyRegistered = true;
    }

    function getCandidateIpfsHash(address _ethereumAddress) public view returns (IpfsHash memory){
        return candidateIpfsHash[_ethereumAddress];
    }

    function setCandidateIpfsHash(address _ethereumAddress, string memory _facialHash, string memory _documentHash) public {
        candidateInfo[_ethereumAddress].faceRegistered = true;
        candidateInfo[_ethereumAddress].fullyRegistered = true;
        candidateIpfsHash[_ethereumAddress] = IpfsHash(_facialHash,_documentHash);
    }

    function getCandidateInfo(address _ethereumAddress) public view returns (CandidateRegistrationInfo memory){
        return candidateInfo[_ethereumAddress];
    }

    function setCandidateBasic(address _ethereumAddress) public {
        
        candidateInfo[_ethereumAddress] = CandidateRegistrationInfo(true,false,false,false);
    }

    function setCandidateOtp(address _ethereumAddress) public {
        
        candidateInfo[_ethereumAddress].otpVerified = true; 
    }

    function setCandidateFace(address _ethereumAddress) public {
        
        candidateInfo[_ethereumAddress].faceRegistered = true; 
        candidateInfo[_ethereumAddress].fullyRegistered = true;
    }

    // Function to register a voter with a hashed password
    function registerVoter(
        string memory _name,
        address _ethereumAddress,
        string memory _email,
        string memory _mobileNumber,
        string memory _voterId,
        string memory _password // Accept the plain password
    ) public {
        require(!voterInfo[_ethereumAddress].profileFilled, "Voter is already registered.");

        // Hash the provided password using a hashing function (e.g., keccak256)
        bytes32 passwordHash = hashPassword(_password);

        voters[_ethereumAddress] = Voter(
            _ethereumAddress,
            _name,
            _email,
            _mobileNumber,
            _voterId,            
            passwordHash // Store the hashed password
        );
        registeredVoters.push(_ethereumAddress);
        voterInfo[_ethereumAddress].profileFilled = true;
        emit VoterRegistered(
            _name,
            _ethereumAddress,
            _email,
            _mobileNumber,
            _voterId
        );
    }

    // Function to hash a password using keccak256 or another suitable hashing function
    function hashPassword(string memory _password) internal pure returns (bytes32) {
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        return passwordHash;
    }

    function isVoterRegistered(address _ethereumAddress) public view returns (bool) {
        return voterInfo[_ethereumAddress].fullyRegistered;
    }



    // Function to log in a voter with a password check
    function loginVoter(string memory _email, string memory _password, address _ethereumAddress) public {
        require(!voterInfo[_ethereumAddress].fullyRegistered, "votersVoter is not registered.");

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

    function checkHasVoted(address _voterEthAddress) public view returns (bool) {
        return hasVoted[_voterEthAddress];
    }   

    function getOwner() public view returns (address tempOwner) {
        return owner;
    }

    function getIsVotingOpen() public view returns (bool) {
        return isVotingOpen;
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory name, string memory email, string memory mobileNumber, uint256 dateOfBirth, string memory homeAddress, uint256 candidateId) {
        require(_candidateId > 0 && _candidateId <= candidates.length, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId - 1];
        return (candidate.name, candidate.email, candidate.mobileNumber, candidate.dateOfBirth, candidate.homeAddress, _candidateId);
    }

    function getWinnerId() public view returns (uint256 id) {
        require(!isVotingOpen, "Election is still open.");
        return winner.id;
    }
    function getWinnerName() public view returns (string memory name) {
        require(!isVotingOpen, "Election is still open.");
        return winner.name;
    }
    function getWinnerVoteCount() public view returns (uint256 voteCount) {
        require(!isVotingOpen, "Election is still open.");
        return winner.voteCount;
    }

    function getResultsDeclared() public view returns (bool) {
        return resultsDeclared;
    }

    function declareElectionResult() public onlyOwner {
        require(!isVotingOpen, "Cannot declare result while voting is open.");
        require(candidates.length > 0, "No candidates to declare as the winner.");

        uint256 winningVoteCount = 0;
        uint256 winningCandidateId = 0;

        resultsDeclared = true;
         
        for (uint256 i = 0; i < candidates.length;) {
        if (candidates[i].voteCount >= winningVoteCount) {
            winningVoteCount = candidates[i].voteCount;
            winningCandidateId = i;
            unchecked{
                i++;
            }
        }
       
        }

        if (winningCandidateId >= 0) {
            string memory winnerName = candidates[winningCandidateId].name;
            uint256 winnerVoteCount = candidates[winningCandidateId].voteCount;
            address winnerAddress = candidates[winningCandidateId].ethereumAddress;

            winner = Winner(winningCandidateId + 1, winnerName, winnerVoteCount, winnerAddress);

            emit ElectionResultDeclared(winnerName, winnerVoteCount);
        }
    }

}
