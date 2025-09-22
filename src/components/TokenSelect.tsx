import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { TOKENS } from '../config/tokens';

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const TokenSelect = ({ value, onChange }: TokenSelectProps) => {
  return (
    <FormControl>
      <FormLabel>Select Token</FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="filled"
      >
        {Object.entries(TOKENS).map(([symbol, config]) => (
          <option key={symbol} value={symbol}>
            {config.name} ({symbol})
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
