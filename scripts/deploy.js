const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners();

  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy();
  await election.waitForDeployment(); // Add parentheses here
  // await election.wait();    // Add parentheses here

  console.log(`Deployed Election Contract at: ${await election.getAddress()}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
