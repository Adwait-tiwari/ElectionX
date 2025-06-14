// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DVote {
    uint public personIndex;
    uint public voteIndex;
    string public Contractname;
    address public admin;

    struct Person {
        string name;
        uint age;
        string partyName;
        string location;
    }

    struct Vote {
        uint voteCount;
        string name;
        string partyName;
        string location;
    }

    constructor() {
        Contractname = "Dvote";
        admin = msg.sender;
        personIndex = 0;
        voteIndex = 0;
    }

    mapping(uint => Person) public persons;
    mapping(uint => Vote) public votes;

    modifier OnlyAdmin() {
        require(msg.sender == admin, "Not a admin");
        _;
    }

    event Registered(string name, uint age, string partyName, string location);

    function RegisterPerson(
        string memory _name,
        uint _age,
        string memory _partyName,
        string memory _location
    ) public {
        personIndex = personIndex + 1;
        persons[personIndex] = Person(_name, _age, _partyName, _location);

        emit Registered(_name, _age, _partyName, _location);
    }

    function getPerson(
        uint _count
    )
        public
        view
        returns (
            string memory name,
            uint age,
            string memory partyName,
            string memory location
        )
    {
        Person memory person = persons[_count];
        return (person.name, person.age, person.partyName, person.location);
    }

    function startVote(
        string memory _name,
        string memory _partyName,
        string memory _location
    ) public OnlyAdmin {
        voteIndex = voteIndex + 1;
        votes[voteIndex] = Vote({
            voteCount: 0,
            name: _name,
            partyName: _partyName,
            location: _location
        });
    }

    function castVote(uint _voteIndex) public {
        require(
            _voteIndex > 0 && _voteIndex <= voteIndex,
            "Invalid vote Index"
        );
        votes[_voteIndex].voteCount += 1;
    }

    function getVote(
        uint _voteIndex
    ) public view returns (uint, string memory, string memory, string memory) {
        require(
            _voteIndex > 0 && _voteIndex <= voteIndex,
            "Invalid vote index"
        );
        Vote memory vote = votes[_voteIndex];
        return (vote.voteCount, vote.name, vote.partyName, vote.location);
    }

    function Result() public view returns (Vote memory) {
        Vote memory winningCandidate;
        uint maxCount = 0;

        for (uint i = 1; i <= voteIndex; i++) {
            if (votes[i].voteCount > maxCount) {
                maxCount = votes[i].voteCount;
                winningCandidate = votes[i];
            }
        }

        return winningCandidate;
    }
}
