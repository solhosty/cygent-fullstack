const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WhitelistClaim", function () {
  async function deployFixture() {
    const [owner, whitelisted, other] = await ethers.getSigners();
    const leaf = ethers.keccak256(ethers.solidityPacked(["address"], [whitelisted.address]));
    const claimAmount = ethers.parseEther("0.1");

    const Factory = await ethers.getContractFactory("WhitelistClaim");
    const contract = await Factory.deploy(leaf, claimAmount);
    await contract.waitForDeployment();

    return { contract, owner, whitelisted, other, claimAmount, leaf };
  }

  it("allows a whitelisted user to claim once", async function () {
    const { contract, owner, whitelisted, claimAmount } = await deployFixture();

    await expect(contract.connect(owner).deposit({ value: ethers.parseEther("1") }))
      .to.emit(contract, "Deposited");

    await expect(contract.connect(whitelisted).claim([]))
      .to.emit(contract, "Claimed")
      .withArgs(whitelisted.address, claimAmount);

    expect(await contract.claimed(whitelisted.address)).to.equal(true);
  });

  it("reverts claim with invalid proof", async function () {
    const { contract, owner, other } = await deployFixture();

    await contract.connect(owner).deposit({ value: ethers.parseEther("1") });

    await expect(contract.connect(other).claim([])).to.be.revertedWith("Invalid proof");
  });

  it("reverts replay claim", async function () {
    const { contract, owner, whitelisted } = await deployFixture();

    await contract.connect(owner).deposit({ value: ethers.parseEther("1") });
    await contract.connect(whitelisted).claim([]);

    await expect(contract.connect(whitelisted).claim([])).to.be.revertedWith("Already claimed");
  });

  it("blocks claim while paused", async function () {
    const { contract, owner, whitelisted } = await deployFixture();

    await contract.connect(owner).deposit({ value: ethers.parseEther("1") });
    await contract.connect(owner).pause();

    await expect(contract.connect(whitelisted).claim([])).to.be.reverted;
  });

  it("enforces owner-only admin controls", async function () {
    const { contract, other, leaf } = await deployFixture();

    await expect(contract.connect(other).setMerkleRoot(leaf)).to.be.reverted;
    await expect(contract.connect(other).setClaimAmount(1n)).to.be.reverted;
    await expect(contract.connect(other).pause()).to.be.reverted;
    await expect(contract.connect(other).unpause()).to.be.reverted;
    await expect(contract.connect(other).deposit({ value: 1n })).to.be.reverted;
  });

  it("reverts claim when contract balance is insufficient", async function () {
    const { contract, whitelisted } = await deployFixture();

    await expect(contract.connect(whitelisted).claim([])).to.be.revertedWith("Insufficient ETH");
  });

  it("emits root and claim amount update events", async function () {
    const { contract, owner, leaf } = await deployFixture();

    const nextRoot = ethers.keccak256(ethers.toUtf8Bytes("new-root"));
    const previousAmount = await contract.claimAmount();

    await expect(contract.connect(owner).setMerkleRoot(nextRoot))
      .to.emit(contract, "MerkleRootUpdated")
      .withArgs(leaf, nextRoot);

    await expect(contract.connect(owner).setClaimAmount(123n))
      .to.emit(contract, "ClaimAmountUpdated")
      .withArgs(previousAmount, 123n);
  });
});
