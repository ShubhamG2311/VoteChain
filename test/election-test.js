// election-test.js

const { expect } = require('chai');

describe('Election', function () {
  let Election;
  let election;
  let owner;
  let admin;
  let voter1;
  let voter2;
  const candidateName = 'Candidate 1';
  const candidateEmail = 'candidate1@example.com';
  const candidateMobileNumber = '1234567890';
  const candidateDateOfBirth = 19900101;
  const candidateAadharNumber = '123456789012';
  const candidateVoterId = 'VOT12345';
  const candidateHomeAddress = '123 Main St';
  const candidateIpfsImageHash = 'QmW2g4j6W8sN3F5a2R1';

  beforeEach(async () => {
    [owner, admin, voter1, voter2] = await ethers.getSigners();

    Election = await ethers.getContractFactory('Election');
    election = await Election.deploy();

    // Add an admin
    await election.addAdmin(admin.address, 'Admin Name', 'admin@example.com');
  });

  it('should deploy the contract', async function () {
    expect(await election.owner()).to.equal(owner.address);
  });

  it('should add an admin', async function () {
    expect(await election.admins(admin.address)).to.include({ isAdmin: true });
  });

  it('should add a candidate', async function () {
    await election.addCandidate(
      candidateName,
      voter1.address,
      candidateEmail,
      candidateMobileNumber,
      candidateDateOfBirth,
      candidateAadharNumber,
      candidateVoterId,
      candidateHomeAddress,
      candidateIpfsImageHash
    );

    const candidate = await election.candidates(1);
    expect(candidate.name).to.equal(candidateName);
    expect(candidate.email).to.equal(candidateEmail);
    expect(candidate.voteCount).to.equal(0);
  });

  // Add more test cases for your contract functions

  // For example, test voter registration, voting, and result declaration

});
