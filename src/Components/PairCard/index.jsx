import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import ChartLine from './ChartLine';
import PairOverview from './PairOverview';
import PastSwaps from './PastSwaps';
import axios from 'axios';
import Loader from '../../Loader';

function PairCard() {
  const [selection, setSelection] =useState('dailystats');
  const [results, setResults] = useState({});
  const[loading,setLoading ] = useState(false);
  const[swapLoading, setSwapLoading] = useState(false)
  const[swapInput, setSwapInput] = useState({})

  const handleChange = (event, newSelection) => {
    setSelection(newSelection);
    renderItem(newSelection);
  };
  async function swapData (){
    setSwapLoading(true);
    const swaps = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',{
      query:`{
        swaps(first: 10, where: { pair: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11" } orderBy: timestamp, orderDirection: desc) {
          timestamp
          amountUSD
          
        }
    }`
    });
    setSwapInput(swaps);
    setSwapLoading(false);
  }
  useEffect(() => {
    async function fetchData (){
      setLoading(true);
      const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',{
        query:`{
          pairDayDatas(orderBy:date,where:{pairAddress:"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"}, first:30, orderDirection:desc){
            date
            pairAddress
            token0{
              name,
              symbol,
              totalSupply,
              tradeVolumeUSD
              
            }
            token1{
              name,
              symbol,
              totalSupply,
              tradeVolumeUSD
              
            }
            dailyVolumeToken0
            dailyVolumeToken1
            dailyVolumeUSD
            dailyTxns
          }
          }`
      });
    setResults(result?.data?.data?.pairDayDatas);
    setLoading(false);
    }
    fetchData();
    swapData();
  }, []);
  
  const renderItem = (selected) => {
    if (selected === "overview") {
       
        return <PairOverview pairData={results}/>
    } else {
        if (selected === "dailystats") {
          if (loading) {
            return <Loader/>
          } else {
            return <ChartLine chartData={results}/> 
          }
         
        } else {
          if (swapLoading) {
            return <Loader/>
          }else {
          return <PastSwaps swapData={swapInput?.data?.data?.swaps} />
          }
            
        }
    }
  }
    return (
        <div style={{
            margin:'20px',
            maxWidth:'1000px',
            width:'90%',
            height:'600px'
        }} >
           <Box sx={{ display: 'flex',
             flexDirection:'column',
             border: 1,
             borderRadius: 5,
             alignItems:'center',
             borderColor: 'grey.500',
             width: '100%',
             height: '100%',
             }}>
                 <ToggleButtonGroup
      color="primary"
      value={selection}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="overview"><Typography variant='h6' fontSize={14} color='grey.500'>Pair Overview</Typography></ToggleButton>
      <ToggleButton value="dailystats"><Typography variant='h6' fontSize={14} color='grey.500'>Daily Data</Typography></ToggleButton>
      <ToggleButton value="pastswaps"><Typography variant='h6' fontSize={14} color='grey.500'>Past Swaps</Typography></ToggleButton>
    </ToggleButtonGroup>
    <Typography variant='h6' color='grey.500'>Trends(DAI-ETH Pair)</Typography>
             {renderItem(selection)}
            </Box>
        </div>
    )
}

export default PairCard
