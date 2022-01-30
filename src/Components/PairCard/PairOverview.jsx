import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function PairOverview(pairData) {
    return (
        <div style={{width:'90%', alignItems:'center'}}>
            <List sx={{
                     width: '98%',
                    }}
                     >
                         
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>DATE: {new Date().toString()}</Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Total Supply DAI: {pairData?.pairData[0]?.token0?.totalSupply} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Total Supply ETH: {pairData?.pairData[0]?.token1?.totalSupply} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Daily Volume ETH:{pairData?.pairData[0]?.dailyVolumeToken1} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Daily Volume DAI:{pairData?.pairData[0]?.dailyVolumeToken0}</Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
        primary={<Typography variant='h6' fontSize={14} color='grey.500'>Daily Volume USD:{pairData?.pairData[0]?.dailyVolumeUSD}</Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText disableTypography
      primary={<Typography variant='h6' fontSize={14} color='grey.500'>Daily Transactions:{pairData?.pairData[0]?.dailyTxns} </Typography>}/>
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
        </div>
    )
}

export default PairOverview
