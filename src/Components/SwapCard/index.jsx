import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent} from '@uniswap/sdk';
import {ethers, } from 'ethers';
import Loader from '../../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const chainId = ChainId.RINKEBY;
const tokenAdress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
function SwapCard(wethBal) {
    const [amount, setAmount] = useState('');
    const [midPrice, setMidPrice] = useState('');
    const [invertMidPrice, setinvertMidPrice] = useState('');
    const [executionPrice, setExecutionPrice] = useState('');
    const [nextMidPrice, setnextMidPrice] = useState('');
    const [loading, setLoading] = useState(false);
useEffect(() => {
  async function initialValues(){
    const dai = await Fetcher.fetchTokenData(chainId, tokenAdress);
    const weth = WETH[chainId];
    const pair = await Fetcher.fetchPairData(dai, weth);
    const route = new Route([pair], weth);
    setMidPrice(route.midPrice.toSignificant(6));
    setinvertMidPrice(route.midPrice.invert().toSignificant(6));
  };
  initialValues();
}, []);
    
   
    async function swap (){
      if(amount <= 0 || amount.length <= 0){
        setLoading(false);
        ErrorToast();
      }
      const inputAmount = amount * 1000000000000000000;
      setLoading(true);
      const dai = await Fetcher.fetchTokenData(chainId, tokenAdress);
          const weth = WETH[chainId];
          const pair = await Fetcher.fetchPairData(dai, weth);
          const route = new Route([pair], weth);
          const trade = new Trade(route, new TokenAmount(weth, inputAmount), TradeType.EXACT_INPUT);
          setMidPrice(route.midPrice.toSignificant(6));
          setinvertMidPrice(route.midPrice.invert().toSignificant(6));
          setExecutionPrice(trade.executionPrice.toSignificant(6));
          setnextMidPrice(trade.nextMidPrice.toSignificant(6));
          const slippageTolerance = new Percent('50','10000');
          const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
          const path = [weth.address, dai.address];
      if (inputAmount < Number(wethBal.wethBal)) {
        try {
         
          await window.ethereum.enable();
          const provider = ethers.getDefaultProvider('rinkeby');
          const signer =  (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          const to = accounts[0];
          const deadline = Math.floor(Date.now()/1000) + 60 *20;
          const value = trade.inputAmount.raw;
          
          const account = signer.connectUnchecked(provider);
          const uniswap = new ethers.Contract(
          '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
          account );
          const tx = await uniswap.swapExactETHForTokens(
            String(amountOutMin),
            path,
            to,
            deadline,
            { value: String(value), gasPrice: 20e9 }
          );
          console.log(`Transaction Hash: ${tx.hash}`);
          const receipt = await tx.wait();
          console.log(`Transaction was mined in Block: ${receipt.blockNumber}`);
          setLoading(false);
          SuccessToast();
          
        } catch (error) {
          setLoading(false);
          WarningToast();

        }
      } else {
        setLoading(false);
        ErrorToast();
      }

    }
    const SuccessToast = () => toast('🦄 Swap successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  const ErrorToast = () => toast.error('💔Invalid Amount!!!...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  const WarningToast = ()=>toast.warn('😟 Error swapping now..!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    return (
        <div style={{
            margin:'20px',
            maxWidth:'1000px',
            width:'90%',
            height:'600px',
            
        }}>
          
            <Box sx={{ display: 'flex',
             border: 1,
             borderRadius: 5,
             borderColor: 'grey.500',
             flexDirection:'column',
             width: '100%',
             height: '100%',
             }}>
                 <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="amount" 
      label="ETH Amount To Swap" 
      InputLabelProps={{
        sx: { color: 'grey.500', }, 
     }}
      variant="outlined" 
      sx={{ marginTop: 10 ,borderColor: 'grey.500'}}
      inputProps={{ sx: {color: 'grey.500'} }} 
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" onClick={swap}>Swap to DAI</Button>
     
    </Box>
    <List sx={{
                     width: '98%',
                    }}
                     >
       {loading && (
      <ListItem>
      <Loader/>
      </ListItem> 
      ) }
                            
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>MidPrice: {midPrice}</Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Inverted MidPrice: {invertMidPrice} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Execution Price: {executionPrice} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Next MidPrice: {nextMidPrice} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
   
    <ToastContainer/>
    <Typography sx={{marginTop: 'auto'}} variant='h6' fontSize={14} color='grey.500'>Note:Slippage @0.05%, Gas @100Gwei </Typography>
    
            </Box>
    
            
        </div>
    )
}

export default SwapCard
