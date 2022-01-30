import React, {useEffect, useState} from 'react'
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountCard from './Components/AccountCard';
import PairCard from './Components/PairCard';
import SwapCard from './Components/SwapCard';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import {ethers,} from 'ethers'
import erc20 from './abi-erc20.json'

let web3;

function App() {
  const [walletAdress, setwalletAdress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [balance , setBalance] = useState(null);
  const [onboard, setOnboard] = useState(null);
  const [balances, setBalances] = useState([]);
  
  function tokenBalance({ tokenAddress}) {
    let ethersProvider;
    let tokenContract;
  
    return async stateAndHelpers => {
      const {
        wallet: { provider },
        address,
        BigNumber
      } = stateAndHelpers;
      
      if (!tokenContract) {
        await window.ethereum.enable();
        if(!provider){
        ethers.getDefaultProvider('rinkeby');
        }
        ethersProvider = new ethers.providers.Web3Provider(provider);
        tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
      }
  
      const tokenDecimals =18;
      const divideBy = new BigNumber(10).pow(tokenDecimals);
      const tokenBalanceResult = await tokenContract
        .balanceOf(address)
        .then(res => res.toString());
      const tokenBalance = tokenBalanceResult/divideBy;
      setBalances(tokenBalance);
    };
  }
  const tokenBalanceCheck = tokenBalance({tokenAddress: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'})
  useEffect(() => {
    const onboard = Onboard({
      dappId:'2e526c00-09ef-4895-a704-7b2203cd0cd7',
      networkId: 4,
      subscriptions: {
         wallet: wallet => {
           web3 = new Web3(wallet.provider);
           console.log("Connected");
         },
         address: setwalletAdress,
         balance: setBalance,
         
      },
      walletCheck:[tokenBalanceCheck]
    })
  setOnboard(onboard);
  }, []);
  
  async function login (){
    await onboard.walletSelect();
    await onboard.walletCheck();
    setisWalletConnected(true);
  }
  return (
    <div className="App">
      {!isWalletConnected && (
        <div className='App-header'>
        <Button variant="contained" onClick={login}>Connect Wallet</Button>
        </div>
      )}
      {isWalletConnected && (
              <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={3}>
                <AccountCard wethBal={balance} walletAd={walletAdress} daiBal={balances}/>
                
              </Grid>
              <Grid item xs={12} sm={12} md={5.5}>
                <PairCard/>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <SwapCard wethBal={balance}/>
              </Grid>
              </Grid>
              </Box>
      )}
    </div>
  );
}

export default App;
