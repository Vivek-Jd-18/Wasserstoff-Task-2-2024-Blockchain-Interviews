import { useState } from 'react'
import './App.css'
import { PROXY_ADDRESS, IMPLEMENTATION_ADDRESS } from './utils/addresses';
import proxyABI from './utils/abis/proxy.json'
import impliABI from './utils/abis/implimentation.json'
import { ethers } from 'ethers';
import LoadingOverlay from './loader/Loader';

function App() {
  const [address, setAddress] = useState<any>('');
  const [signer, setSigner] = useState<any>('');
  const [tokenBalance, setTokenBalance] = useState<any>(0)
  const [mintAmount, setMintAmount] = useState<any>('');
  const [stakeAmount, setStakeAmount] = useState<any>('');
  const [stakeDetails, setStakeDetails] = useState({
    amount: '',
    time: ''
  });
  const [loader, setLoader] = useState(false)

  async function initMetaMask() {
    setLoader(true)
    const _window: any = (window as any)
    if (address.length) {
      setLoader(false)
      setAddress('');
      return
    }
    if (_window.ethereum) {
      try {
        await _window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(_window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        console.log(signer);
        setAddress(address);
        setSigner(signer);
        setLoader(false)
      } catch (error) {
        console.error('User denied access to MetaMask or something went wrong:', error);
        setLoader(false)
      }
    } else {
      console.error('MetaMask not found');
      setLoader(false)
    }
    setLoader(false)
  }

  // function to call mint function
  const _mint = async () => {
    setLoader(true)
    if (!address.length) {
      setLoader(false)
      alert("Please connect your wallet");
      return;
    }
    try {
      const contract = new ethers.Contract(PROXY_ADDRESS, impliABI, signer)
      const _mintRes = await contract.mint(mintAmount);
      console.log(await _mintRes.wait(), " -mint- ")
      await _balanceOf()
      setLoader(false)
      alert("Minted Successfully")
    } catch (error) {
      console.log(error)
      setLoader(false)
      alert("Minting Failed")
    }
  }

  // function to call stake function
  const _stake = async () => {
    setLoader(true)
    if (!address.length) {
      setLoader(false)
      alert("Please connect your wallet");
      return;
    }
    if (stakeAmount <= 0) {
      setLoader(false)
      alert("Please enter valid staking amount");
      return;
    }
    try {
      const contract = new ethers.Contract(PROXY_ADDRESS, impliABI, signer)
      const _stakeRes = await contract.stake(stakeAmount);
      console.log(await _stakeRes.wait(), " -stake- ")
      setLoader(false)
      await _getStakingDetails()
      alert("Staked Successfully")
    } catch (error) {
      console.log(error)
      setLoader(false)
      alert("Staking Failed")
    }
  }

  const _unStake = async () => {
    setLoader(true)
    if (!address.length) {
      setLoader(false)
      alert("Please connect your wallet");
      return;
    }
    try {
      const contract = new ethers.Contract(PROXY_ADDRESS, impliABI, signer)
      const _stakeRes = await contract.unstake();
      console.log(await _stakeRes.wait(), " -unstake- ")
      setLoader(false)
      await _getStakingDetails()
      alert("unstaked Successfully")
    } catch (error) {
      console.log(error)
      setLoader(false)
      alert("UnStaking Failed")
    }
  }

  const getTime = (_timeStamp: number) => {
    return new Date((_timeStamp) * 1000).toLocaleString();
  }
  // function to get staking details 
  const _getStakingDetails = async () => {
    setLoader(true)
    if (!address.length) {
      setLoader(false)
      alert("Please connect your wallet");
      return;
    }
    // getTime(parseInt((await _getStakingDetailsRes).stakeTime._hex, 16)) * 1000)
    try {
      const contract = new ethers.Contract(PROXY_ADDRESS, impliABI, signer)
      const _getStakingDetailsRes = await contract.stakeDetail(address);
      console.log(await _getStakingDetailsRes, " -getStakingDetails- ", _getStakingDetailsRes.stakeTime)
      setStakeDetails({
        amount: parseInt((await _getStakingDetailsRes).amount._hex, 16).toString(),
        time: ( (_getStakingDetailsRes).amount._hex !== '0x00' ? getTime(parseInt((await _getStakingDetailsRes).stakeTime._hex, 16)) : "Not Staked")
      })
    setLoader(false)
} catch (error) {
  setLoader(false)
  console.log(error)
}
  }

// function to get token balance
const _balanceOf = async () => {
  setLoader(true)
  if (!address.length) {
    setLoader(false)
    alert("Please connect your wallet");
    return;
  }
  try {
    const contract = new ethers.Contract(PROXY_ADDRESS, impliABI, signer)
    const _balanceOfRes = await contract.balanceOf(address);
    console.log(await _balanceOfRes, " -balanceOf- ")
    setTokenBalance(parseInt(_balanceOfRes._hex, 16).toString())
    setLoader(false)
  } catch (error) {
    setLoader(false)
    console.log(error)
  }
}


return (
  <>
    {loader ? <div>
      <LoadingOverlay />
    </div > :
      <div>
        <h1>Task 2 Demonstration :</h1>
        <div className="card">
          <button onClick={() => initMetaMask()}>
            {address.length ? address : "Click to Connect"}
          </button>
          <br />
          <input type="text" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} placeholder='Enter amount' />
          <button onClick={() => _mint()} style={{ minWidth: "150px", margin: "10px" }}>
            Mint
          </button>
          <br />
          {/* similarly for transferring tokens */}

          <input type="text" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} placeholder='Enter amount' />
          <button onClick={() => _stake()} style={{ minWidth: "150px", margin: "10px" }}>
            Stake
          </button>
          <br />
          <button onClick={() => _unStake()} style={{ minWidth: "150px", margin: "10px" }}>
            UnStake
          </button>
          <br />
          <button onClick={() => _balanceOf()} style={{ minWidth: "150px", margin: "10px" }}>
            get tokenBalance {tokenBalance}
          </button>
          <br />
          <button onClick={() => _getStakingDetails()} style={{ minWidth: "150px", margin: "10px" }}>
            get Staking Details:
            <br />
            Amount Staked: {stakeDetails.amount}
            <br />
            Staked Time: {stakeDetails.time}
          </button>
          <br />
        </div>
        <p className="read-the-docs">
          Illustration of Task2,  github link <a href="https://github.com/Vivek-Jd-18/-Wasserstoff-Task-2-2024-Blockchain-Interviews-">here</a>
        </p>
      </div>}
  </>
)
}

export default App
