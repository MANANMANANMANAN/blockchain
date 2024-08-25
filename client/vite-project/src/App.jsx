
import React, { useEffect,useState,useMemo } from 'react'
import { io } from "socket.io-client"
import {ethers} from 'ethers';
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"),[]);
  
  const [message,setMessage] = useState("");
  const [socketId,setSocketId] = useState("");
  const [room,setRoom] = useState("");
  const [roomName,setRoomName] = useState("");
  const [messages,setMessages] = useState([]);
  const [provider, setProvider] = useState(null);
const [account, setAccount] = useState(null);
const [isConnected, setIsConnected] = useState(false);
async function sendCredits() {
      const provider = await new ethers.BrowserProvider(window.ethereum);
      // await provider.request("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractAddress = "0x8f7009745202fa7b1c48276feb82fff5b86d40b0"
      const contractAbi = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_totalMoney",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "ContributionSent",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "contribution",
              "type": "uint256"
            }
          ],
          "name": "sendContribution",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "deployer",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalMoney",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      const contractInstance = await new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.sendContribution("0x773aB01b235D43Ed2f6D0bf00e8d2bb6c8F9a183",1);
      await tx.wait();
      cono
      // canVote();
  }
  // console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
  }
  const handleFund = () => {
    sendCredits();
  }
  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");
  }
  useEffect( () => {

    socket.on("connect",()=>{
      setSocketId(socket.id);
      console.log("connected",socket.id);
    })
    socket.on("welcome",(s) => {
      console.log(s);
    })
    socket.on("receive-message",(data)=>{
      console.log(data);
      setMessages((messages) => 
        [...messages,data]
      );

    })
    return () => {
      socket.disconnect();
    };
  },[]);
  return (
    <div>
      <form action="" onSubmit={joinRoomHandler}>
        Join Room
        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
        <button type="submit">Join</button>
      </form>
      <div>
        {socketId}
      </div>
      <input type="text" value={room} onChange={(e) => setRoom(e.target.value)}/>
      <form action="" onSubmit={handleSubmit}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button type="submit">Send</button>
      </form>
      <div>
        {
          messages.map((i) => (
            
            <div>{i} <button onClick={handleFund}>Upvote</button>
            </div>
            
            
          ))
        }
      </div>
      
    </div>
  )
}

export default App
