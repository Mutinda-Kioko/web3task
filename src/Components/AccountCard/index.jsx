import React from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
function AccountCard ({walletAd,wethBal, daiBal }){
  const Bal = Number(wethBal)/1000000000000000000
    return (
        <div className='accountCard'>
            <Box sx={{ display: 'flex',
             
             flexDirection:'column',
             border: 1,
             borderRadius: 5,
             borderColor: 'grey.500',
             width: '100%',
             height: '100%',
             }}>
                 <Typography variant='h6' color='grey.500'> Account card</Typography>
                 <Divider style={{height: 2, margin: 0, width:'100%',}} light={true}/>
                 <Card sx={{ width: '98%', marginLeft:'3px' }}>
                 <CardContent>
                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Address:
                </Typography>
                <Typography variant="body2">
               {walletAd}
                </Typography>
                 </CardContent>
                 </Card>
                 {/*Address */}
                 {/*Balances */}
                 <List sx={{
                     width: '98%',
                    }}
                     >
                         
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img style={{maxWidth: '40px', objectFit:'contain'}} src='https://toppng.com/uploads/preview/ethereum-purple-blue-icon-11552773978cix3fnbdty.png' alt='ETH'/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText disableTypography
        primary={<Typography variant='h6' color='grey.500'>{wethBal != null && (
          <span>
            {Bal.toPrecision(9)}
            ETH
          </span>
        )}</Typography>}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img style={{maxWidth: '40px', objectFit:'contain'}} src='https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png' alt='DAI'/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText disableTypography
        primary={<Typography variant='h6' color='grey.500'>{wethBal != null && (
          <span>
            {daiBal.toPrecision(9)}
            DAI
          </span>
        )}</Typography>}/>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>

            </Box>
        </div>
    )
}

export default AccountCard
