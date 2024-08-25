// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContributionDistributor {
    address public deployer;
    uint256 public totalMoney;
    // uint256 public totalMoney_judge;
    // struct Message {
    //     address uploader;
    //     address[] likeArray; // Adresses of judges liking 
    //     uint likeCount;
    // }
    // address [] active_members; // Members that are active / have sent atleast one message in the group 
    // address [] judges; // addresses of all the judges
    // uint total_likes = 0;
    // mapping(address => uint256) public address_to_numlikes;
    // mapping(address => uint256) public judges_to_fraction; //Maintains that upon the message the judge reacts how much fraction of judges react
    // mapping(address => uint256) public judge_like; // Maintains that each judge is liking how much messages
    // Message[] public Analysis; 
    // uint num_participants;
    // uint num_judges;
    // // Event to log the transfer
    event ContributionSent(address indexed to, uint256 amount);

    // Constructor is now payable and accepts Ether
    constructor(uint256 _totalMoney) payable {
        deployer = msg.sender;
        totalMoney = _totalMoney;
    }

    // Function to send contribution * totalMoney to a specified address
    function sendContribution(address recipient, uint256 contribution) public  {
        require(msg.sender == deployer, "Only deployer can send contributions");
        require(contribution > 0, "Contribution must be greater than zero");
        uint256 amountToSend = contribution * totalMoney;
        require(address(this).balance >= amountToSend, "Insufficient balance in contract");
        payable(recipient).transfer(amountToSend);
        emit ContributionSent(recipient, amountToSend);
    }

    // function Distribute() public
    // {
    //     // for (uint256 i = 0; i < Analysis.length; i++) { 
    //     //     address_to_numlikes[Analysis[i].uploader] += Analysis[i].likeCount;
    //     //     total_likes += Analysis[i].likeCount;

    //     // }
    //     for (uint256 i = 0; i < active_members.length; i++) // This loop distributes money to the participants such that in the ratio of total fractions of likes acquired by him
    //     {
    //         sendContribution(active_members[i],totalMoney*address_to_numlikes[active_members[i]]/total_likes);
    //     }
    //     for (uint256 i = 0; i < judges.length; i++) // Judges get money from their share to an extent that upon how many messages he reacts he is right
    //     {
    //         sendContribution(judges[i],totalMoney_judge*judges_to_fraction[judges[i]]/num_judges/judge_like[judges[i]]);
    //     }
    // }
    // Function to withdraw ether from the contract (only for deployer)
    // function sendContribution_basic(address recipient, uint256 amount) public  {
    //     require(msg.sender == deployer, "Only deployer can send contributions");
    //     require(contribution > 0, "Contribution must be greater than zero");
    //     uint256 amountToSend = contribution * totalMoney;
    //     require(address(this).balance >= amountToSend, "Insufficient balance in contract");
    //     payable(recipient).transfer(amountToSend);
    //     emit ContributionSent(recipient, amountToSend);
    // }
    function withdraw(uint256 amount) external {
        require(msg.sender == deployer, "Only deployer can withdraw");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(deployer).transfer(amount);
    }
}
