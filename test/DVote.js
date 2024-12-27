const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Deployement",async()=>{

	let contract;

	before(async()=>{
		const Dvote = await ethers.getContractFactory("DVote");
		contract = await Dvote.deploy();

		[owner,deployer] = await ethers.getSigners();
	})

	describe("Deployed",async()=>{
		it("has a PersonCount",async()=>{
			const result = await contract.personIndex()
			expect(result).to.equal(0);
		})

		it("has a name",async()=>{
			const result = await contract.Contractname()
			expect(result).to.equal("Dvote");
		})

		it("has a voterCount",async()=>{
			const result = await contract.voteIndex()
			expect(result).to.equal(0);
		})
	})

	describe("Register Person",async()=>{

		const name = "Adwait"
		const age = 23
		const partyName = "BJP"

		beforeEach(async()=>{
			await contract.connect(owner).RegisterPerson(name,age,partyName);
		})

		it("Person is registered",async()=>{
			const result = await contract.getPerson(1);
			expect(result.name).to.equal("Adwait")
			expect(result.age).to.equal(23)
			expect(result.partyName).to.equal("BJP")
		})
	})

	describe("Start Voting",async()=>{
		const name = "Adwait"
		const partyName = "BJP"

		beforeEach(async()=>{
			await contract.connect(deployer).startVote(name,partyName);
			await contract.connect(deployer).castVote(1);
		})

		it("Person Voted",async()=>{
			const result = await contract.getVote(1);
			const [voteCount,candidateName, candidatePartyName] = result;
			expect(candidateName).to.equal("Adwait");
		})
	})

	describe("Result of Election",async()=>{
		
		beforeEach(async()=>{
			  await contract.startVote("Adwait", "BJP");
			  await contract.startVote("Rahul", "Congress");

			  await contract.castVote(1); 
			  await contract.castVote(2); 
			  await contract.castVote(2);
		})

		it("Winning candidate",async()=>{
			  const result = await contract.Result();
			  expect(result.name).to.equal("Adwait");
			  expect(result.partyName).to.equal("BJP");
			  expect(result.voteCount).to.equal(2);
		})
	})

})