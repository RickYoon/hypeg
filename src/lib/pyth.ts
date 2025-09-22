interface PythPrice {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
}

interface PythPriceResponse {
  id: string;
  price: PythPrice;
  ema_price: PythPrice;
}

interface PythApiResponse {
  parsed: PythPriceResponse[];
}

export interface NormalizedPrice {
  symbol: string;
  price: number;
  confidence: number;
  publishTime: Date;
  pegDeviation: number;
}

const HERMES_API = 'https://hermes.pyth.network/v2/updates/price/latest';

export const fetchPrices = async (priceIds: string[]): Promise<PythPriceResponse[]> => {
  try {
    const queryString = priceIds.map(id => `ids[]=${id}`).join('&');
    console.log('Fetching from URL:', `${HERMES_API}?${queryString}`);
    
    const response = await fetch(`${HERMES_API}?${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.statusText}`);
    }
    
    const data: PythApiResponse = await response.json();
    console.log('Raw API response:', data);
    
    if (!data.parsed || !Array.isArray(data.parsed)) {
      throw new Error('Invalid API response format');
    }
    
    return data.parsed;
  } catch (error) {
    console.error('Error in fetchPrices:', error);
    throw error;
  }
};

export const normalizePythPrice = (pythPrice: PythPrice): number => {
  try {
    const price = BigInt(pythPrice.price);
    const expo = pythPrice.expo;
    const normalizedPrice = Number(price) * Math.pow(10, expo);
    console.log('Normalized price:', { original: pythPrice, normalized: normalizedPrice });
    return normalizedPrice;
  } catch (error) {
    console.error('Error in normalizePythPrice:', error);
    throw error;
  }
};

export const calculatePegDeviation = (
  price: number,
  basePrice: number
): number => {
  const ratio = price / basePrice;
  return ((ratio - 1.0) / 1.0) * 100;
};