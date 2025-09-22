import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  VStack,
  HStack,
  useColorMode,
  IconButton,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Tooltip,
  Link,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, InfoIcon, ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { TOKENS } from './config/tokens';
import { fetchPrices, normalizePythPrice } from './lib/pyth';
import { Logo } from './components/Logo';

interface PriceData {
  symbol: string;
  tokenRatio: number;
  referencePrice: number;
  usdPrice: number;
  timestamp: number;
}

interface ArbitrageInfo {
  discount: string;
  potentialGain: string;
  steps: string[];
  projectUrl: string;
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [pricesData, setPricesData] = useState<Record<string, PriceData>>({});
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [referencePrice, setReferencePrice] = useState<number | null>(null);

  const fetchAllPrices = useCallback(async () => {
    try {
      const priceIds = new Set<string>();
      Object.values(TOKENS).forEach(token => {
        priceIds.add(token.priceId);
        if (token.referenceTokenId) {
          priceIds.add(token.referenceTokenId);
        }
      });

      const prices = await fetchPrices([...priceIds]);
      const pricesMap = new Map(prices.map(p => [p.id, normalizePythPrice(p.price)]));
      const timestamp = prices[0].price.publish_time;
      const hypePrice = pricesMap.get(TOKENS.HYPE.priceId) || 0;
      
      setReferencePrice(hypePrice);

      const newPricesData: Record<string, PriceData> = {};

      Object.entries(TOKENS).forEach(([symbol, config]) => {
        if (config.type === 'reference') return;

        const rawPrice = pricesMap.get(config.priceId) || 0;
        let tokenRatio, usdPrice;

        if (config.isUsdPrice) {
          usdPrice = rawPrice;
          tokenRatio = rawPrice / hypePrice;
        } else {
          tokenRatio = rawPrice;
          usdPrice = rawPrice * hypePrice;
        }

        newPricesData[symbol] = {
          symbol,
          tokenRatio,
          referencePrice: hypePrice,
          usdPrice,
          timestamp: timestamp * 1000,
        };
      });

      setPricesData(newPricesData);
      setLastUpdateTime(new Date(timestamp * 1000));
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchAllPrices]);

  const formatUsdPrice = (price: number) => `$${price.toFixed(4)}`;
  const formatRatio = (ratio: number) => ratio.toFixed(4);
  const formatPremium = (ratio: number) => {
    const premium = ((1 - ratio) * 100).toFixed(2);
    return `${ratio > 1 ? '+' : ''}${-Number(premium)}%`;
  };

  const getPremiumColor = (ratio: number) => {
    if (Math.abs(1 - ratio) < 0.001) return 'gray.500';
    return ratio > 1 ? 'green.400' : 'yellow.400';
  };

  const getRowBackground = (isDiscount: boolean) => {
    if (!isDiscount) return 'transparent';
    return colorMode === 'dark' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(72, 187, 120, 0.05)';
  };

  const getArbitrageInfo = (symbol: string, ratio: number): ArbitrageInfo | null => {
    if (ratio >= 1) return null;
    
    const token = TOKENS[symbol];
    const discount = ((1 - ratio) * 100).toFixed(2);
    const potentialGain = ((1 / ratio - 1) * 100).toFixed(2);
    
    return {
      discount,
      potentialGain,
      steps: [
        `Buy ${symbol} at current price (${discount}% discount)`,
        `Redeem ${symbol} for HYPE (1:1)`,
        `Potential profit: ${potentialGain}%`
      ],
      projectUrl: token.project?.url || ''
    };
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack>
          <VStack align="start" spacing={2}>
            <Logo />
            <Text color="gray.500">HYPE Price: {formatUsdPrice(referencePrice || 0)}</Text>
          </VStack>
          <Spacer />
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </HStack>

        {Object.entries(pricesData).map(([symbol, data]) => {
          const arbitrageInfo = getArbitrageInfo(symbol, data.tokenRatio);
          if (arbitrageInfo) {
            return (
              <Alert
                key={`alert-${symbol}`}
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="flex-start"
                p={4}
                borderRadius="md"
                bg={colorMode === 'dark' ? 'blue.900' : 'blue.50'}
              >
                <HStack w="100%" mb={2}>
                  <AlertIcon />
                  <AlertTitle>Arbitrage Opportunity: {symbol}</AlertTitle>
                  <Spacer />
                  <Link href={arbitrageInfo.projectUrl} isExternal>
                    <Button size="sm" rightIcon={<ArrowForwardIcon />} colorScheme="green" variant="outline">
                      Trade Now
                    </Button>
                  </Link>
                </HStack>
                <AlertDescription>
                  <VStack align="start" spacing={1}>
                    <Text>Current Discount: {arbitrageInfo.discount}%</Text>
                    <Text>Potential Profit: {arbitrageInfo.potentialGain}%</Text>
                    <Text fontWeight="bold" mt={2}>Steps:</Text>
                    {arbitrageInfo.steps.map((step, idx) => (
                      <Text key={idx} ml={4}>• {step}</Text>
                    ))}
                  </VStack>
                </AlertDescription>
              </Alert>
            );
          }
          return null;
        })}

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Token</Th>
                <Th>Project</Th>
                <Th isNumeric>USD Price</Th>
                <Th isNumeric>Price Ratio</Th>
                <Th isNumeric>Premium</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(pricesData).map(([symbol, data]) => {
                const token = TOKENS[symbol];
                if (token.type === 'reference') return null;

                const isDiscount = data.tokenRatio < 1;

                return (
                  <Tr 
                    key={symbol}
                    bg={getRowBackground(isDiscount)}
                    transition="background-color 0.2s"
                    _hover={{
                      bg: isDiscount 
                        ? (colorMode === 'dark' ? 'rgba(72, 187, 120, 0.15)' : 'rgba(72, 187, 120, 0.1)')
                        : (colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50')
                    }}
                  >
                    <Td>
                      <HStack spacing={2}>
                        <Text fontWeight="bold">{symbol}</Text>
                        <Badge colorScheme={token.type === 'lst' ? 'blue' : 'purple'}>
                          {token.type === 'lst' ? 'LST' : 'VAULT'}
                        </Badge>
                        {isDiscount && (
                          <Badge colorScheme="green">DISCOUNT</Badge>
                        )}
                        {token.description && (
                          <Tooltip label={token.description}>
                            <InfoIcon boxSize={4} color="gray.500" />
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                    <Td>
                      {token.project && (
                        <Link href={token.project.url} isExternal color="blue.400">
                          {token.project.name} <ExternalLinkIcon mx="2px" />
                        </Link>
                      )}
                    </Td>
                    <Td isNumeric>{formatUsdPrice(data.usdPrice)}</Td>
                    <Td isNumeric>{formatRatio(data.tokenRatio)}</Td>
                    <Td isNumeric>
                      <Text color={getPremiumColor(data.tokenRatio)}>
                        {formatPremium(data.tokenRatio)}
                      </Text>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>

        <Text fontSize="sm" color="gray.500" textAlign="right">
          Last Update: {lastUpdateTime?.toLocaleString() ?? 'Loading...'}
        </Text>
      </VStack>
    </Container>
  );
}

export default App;