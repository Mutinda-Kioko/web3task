import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
let data =[];
const inputData = []
function ChartLine(chartData) {
  
  for(let num = 0; num <=chartData?.chartData?.length; num++){
    inputData.push({
      date:chartData?.chartData[num]?.date,
      value:Math.floor(Number(chartData?.chartData[num]?.dailyVolumeUSD)),
    })
    
  }
  data = inputData.slice(0, 30).reverse()
    return (
      <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={() => {
            return "";
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={20}
          tickFormatter={(number) => `$${number}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
    )
}
function CustomTooltip({ active, payload }) {
  if (active && payload) {
    return (
      <div style={{
        borderRadius: '0.25rem',
        background: '#26313c',
        color: '#fff',
        padding: '1rem',
        boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'}} >
        <h4>dailyVolumeUSD</h4>
        
        <p>${payload[0]?.value}</p> 
        
       
        
      </div>
    );
  }
  return null;
}

export default ChartLine
