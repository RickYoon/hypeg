import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PricePoint {
  timestamp: number;
  price: number;
  peg: number;
}

interface PriceChartProps {
  data: PricePoint[];
  symbol: string;
}

export const PriceChart = ({ data, symbol }: PriceChartProps) => {
  const axisColor = useColorModeValue('gray.600', 'gray.400');
  const gridColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box h="400px" w="100%">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            stroke={axisColor}
          />
          <YAxis stroke={axisColor} />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            contentStyle={{
              backgroundColor: useColorModeValue('white', 'gray.800'),
              border: '1px solid gray',
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3182ce"
            name={symbol}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="peg"
            stroke="#718096"
            strokeDasharray="5 5"
            name="Peg"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
