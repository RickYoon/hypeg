import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  isNegative?: boolean;
}

export const KpiCard = ({ title, value, subtitle, isNegative }: KpiCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const valueColor = isNegative ? 'red.500' : 'green.500';

  return (
    <Box
      p={5}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      minW="200px"
    >
      <VStack spacing={2} align="start">
        <Text fontSize="sm" color="gray.500">
          {title}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color={valueColor}>
          {value}
        </Text>
        {subtitle && (
          <Text fontSize="xs" color="gray.500">
            {subtitle}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
