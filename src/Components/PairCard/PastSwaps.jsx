import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


  

function PastSwaps(swapData) {
  const  swaps = swapData?.swapData.slice(0, 9);
    return (
        <div>
            <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6' fontSize={14} color='grey.500'>Date</Typography></TableCell>
            <TableCell align="right"><Typography variant='h6' fontSize={14} color='grey.500'>Amount USD</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {swaps?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Typography variant='body2' fontSize={12} color='grey.500'>{new Date(Number(row.timestamp)).toTimeString()}</Typography>
              </TableCell>
              <TableCell align="right"><Typography variant='body2' fontSize={14} color='grey.500'>{Math.floor(row.amountUSD)}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default PastSwaps
