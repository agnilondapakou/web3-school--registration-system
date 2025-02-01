import { useState } from 'react'

declare global {
  interface Window {
    ethereum: any;
  }
}

import './App.css'
import { ethers } from 'ethers';
import abi from '../abi.json';

const contractAddress = '0x807f8747Af54f35A09bE084db8d12561ce6a3E72';

function App() {
  const [studentName, SetStudentName] = useState('');
  const [studentId, SetStudentId] = useState('');

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function registerStudent() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try{
      const transaction = await contract.registerStudent(studentName);
      await transaction.wait();
      alert(`${studentName} is now registered`);
    } catch (err) {
      console.log(err);
      alert(`Transaction failed ${err}`);
    }
  }

  async function removeStudent() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transaction = await contract.removeStudent(studentId);
      await transaction.wait();
      alert(`${studentName} is now removed`);
    } catch (err) {
      console.log(err);
      alert(`Transaction failed ${err}`);
    }
  }

  async function getStudent() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const student = await contract.getStudent(studentId);
      alert(`Student name: ${student}`);
    } catch (err) {
      console.log(err);
      alert(`Transaction failed ${err}`);
    }
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Enter student name" onChange={(e) => SetStudentName(e.target.value)} />
        <button onClick={registerStudent}>Register Student</button>
      </div>
      <div>
        <input type="text" placeholder="Enter student ID" onChange={(e) => SetStudentId(e.target.value)} />
        <button onClick={removeStudent}>Remove Student</button>
      </div>
      <div>
        <input type="text" placeholder="Enter student ID" onChange={(e) => SetStudentId(e.target.value)} />
        <button onClick={getStudent}>Get Student</button>
      </div>
    </div>
  )
}

export default App
