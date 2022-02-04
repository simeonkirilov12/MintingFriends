import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Web3 from "web3"
import { FullPage, Slide } from 'react-full-page'
import ReactPlayer from 'react-player'
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import { contractAbi, contractAddress } from './config'
import tokenSlider from './components/tokenSlider'
import styled from 'styled-components'

import { Image, Button, Container, Row, Col, Card, Text } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'


// Custom Style
import './App.css'

const StyledPadding = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
`
const StyledCard = styled(Card)`
  background: linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
  box-shadow: rgb(0 152 161) 0px 0px 0px 1px, rgb(31 199 212 / 40%) 0px 0px 4px 8px;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
  font-size: 24px;
  height: fit-content;
  padding-top: 64px;
  margin: auto;
  
`
const StyledWrapper = styled.div`
  text-align: left;
`

const App = () => {

  const [chainId, setChainId] = useState(null);
  const [method, setMethod] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  let [mintNum, setMintNum] = useState(1);
 // const api = "https://wwww.supbirds.com/meta/";

  useEffect(async () => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        loadBlockchainData();
        getCurrentAddressConnected();
        addAccountsAndChainListener();
      } catch (error) {
        console.error(error);
      }
    } else {
      swal(
        "",
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
        "error"
      );
    }
  }
  const loadBlockchainData = async () => {
    const contract = new window.web3.eth.Contract(contractAbi, contractAddress);
    setContract(contract);
    const chainId = await window.web3.eth.getChainId();
    setChainId(chainId);
    {
      chainId === 25 ? setMethod("success") : setMethod("error");
    }
    // method && fireToast()

    // if (chainId === 1) {
    const owner = await contract.methods.owner().call();
    setOwner(owner);

    const totalSupply = await contract.methods.totalSupply().call();
    setTotalSupply(totalSupply);
    
    const price = await contract.methods.cost().call();
    setPrice(price);
    const displayPrice = window.web3.utils.fromWei(price, "ether");
    setDisplayPrice(displayPrice);

    const maxSupply = await contract.methods.maxSupply().call();
    setMaxSupply(maxSupply);

    //event will be fired by the smart contract when a new PetPal is minted
    contract.events
      .Mint()
      .on("data", async function (result) {
        setTotalSupply(result.returnValues[1]);
      })
      .on("error", console.error);
    // }
  };

  const getCurrentAddressConnected = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addAccountsAndChainListener = async () => {
    //this event will be emitted when the currently connected chain changes.
    window.ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

    // this event will be emitted whenever the user's exposed account address changes.
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        document.getElementById("connectButton").disabled = true;
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        document.getElementById("connectButton").disabled = false;
        setAccount(accounts[0]);
        method && fireToast();
      } catch (error) {
        if (error.code === 4001) {
          swal("Request to access account denied!", "", "error");
        }
        document.getElementById("connectButton").disabled = false;
      }
    }
  };
  
  async function mint(mintCount) {
    if (contract) {
      // console.log('debug->contract', contract)
      // if (chainId === 1) {
      if (mintCount === 0) {
        swal("Minimum mint amount is 1 SupBirds", "", "info");
      } else {
        try {
          const finalPrice = Number(price) * mintCount;
          console.log('debug->here', account, finalPrice)
          await contract.methods
            .mint(account, mintCount)
            .send({ from: account, value: finalPrice });
        } catch (error) {
          if (error.code === 4001) {
            swal("Transaction Rejected!", "", "error");
          } else {
            swal("Transaction Failed!", "", "error");
          }
        }
      }
      // } else {
      //   swal("Please switch to mainnet to mint PetPal", "", "error");
      // }
    } else {
      swal(
        "",
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
        "error"
      );
    }
  }

  async function pauseMint() {
    if (contract) {
      if( account == owner) {
        try {
          await contract.methods
            .pause(true)
            .send({ from: account });
        } catch (error) {
          if (error.code === 4001) {
            swal("Transaction Rejected!", "", "error");
          } else {
            swal("Transaction Failed!", "", "error");
          }
        }
      } else {
        swal(
          "",
          "Contract owner can control pause or resume minting",
          "error"
        );
      }
    } else {
      swal(
        "",
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
        "error"
      );
    }
  }

  async function withdraw() {
    if (contract) {
        try {
          await contract.methods
            .withdraw().send({ from: account });
        } catch (error) {
          if (error.code === 4001) {
            swal("Transaction Rejected!", "", "error");
          } else {
            swal("Transaction Failed!", "", "error");
          }
        }
     }
  }
  
  
  function handleMinus() {
    // let newNum = 1
    // if(mintNum >= 2)
    //   newNum = mintNum-1;
    // setMintNum(newNum);
    if(mintNum >= 2)
      setMintNum(mintNum - 1)
  }

  function handlePlus() {
    // const nuwNum = mintNum + 1;
    // setMintNum(nuwNum);
    setMintNum(mintNum + 1)
  }
  const fireToast = () => {
    toast[method](
      `You are ${method === "error" ? "not" : ""} connected to mainnet`,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: true,
      }
    );
  };

  return (
    <FullPage controls={false}>
      <Header />
      
      {/* Section 1 */}
      <Slide className='top__section' id='home'>
        <div className='container'>
          {/* <div className='row text-center'> */}
            {/* <div className='col-md-9 m-auto'> */}
              {/* <h1>
                 My Lucky Apes
              </h1> */}
        
              <StyledCard className='mintCard'>
                <h1>{totalSupply}/{maxSupply}</h1>


                

              

                {/* <p className='sub__heading'>
                  {contractAddress.slice(0, 7) + '...' + contractAddress.slice(contractAddress.length - 4)}
                </p> */}

                <p className='sub__heading'>
                  1 Lucky Ape costs 0.08 ETH
                </p>
                <p className='sub__heading'>
                  Mint your Wild Ape
                </p>
                <div class="qty mt-1">
                  <span class="minus bg-dark" onClick={() => handleMinus()}>-</span>
                  <input type="number" class="count" name="qty" value={mintNum} />
                  <span class="plus bg-dark" onClick={()=>handlePlus()}>+</span>
                </div>
                <StyledPadding />
                 {account? <Button variant='primary' onClick={() =>mint(mintNum)}>Get Wild Ape</Button> : 
                <Button variant='primary' id='connectButton' onClick={connectMetaMask}>Connect Wallet</Button>} 
               {/*<Button variant='primary' onClick={() =>mint(mintNum)}>Mint a SupBird</Button> */}
              </StyledCard>
            {/* </div> */}
          {/* </div> */}
        </div>
      </Slide>
  

<Footer>
          <p className="contract">
                  {contractAddress}
                </p>
</Footer>
    </FullPage>
  )
}

export default App
