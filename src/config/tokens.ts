export interface TokenConfig {
  symbol: string;
  name: string;
  priceId: string;
  decimals: number;
  type: 'reference' | 'lst' | 'vault';
  referenceTokenId?: string;
  description?: string;
  isUsdPrice?: boolean;
  project?: {
    name: string;
    url: string;
  };
}

const REFERENCE_TOKEN = {
  symbol: 'HYPE',
  name: 'HYPE Token',
  priceId: '4279e31cc369bbcc2faf022b382b080e32a8e689ff20fbc530d2a603eb6cd98b',
  decimals: 8,
  type: 'reference' as const,
  description: 'Reference HYPE token for price comparison'
};

export const TOKENS: Record<string, TokenConfig> = {
  HYPE: REFERENCE_TOKEN,
  kHYPE: {
    symbol: 'kHYPE',
    name: 'kHYPE Token',
    priceId: '983b7cabc6fab548e15a5b05500da9b99c1682107b3e2ff289344116c10ac02c',
    decimals: 8,
    type: 'lst',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'LST version of HYPE token',
    project: {
      name: 'Kinetiq',
      url: 'https://kinetiq.xyz/'
    }
  },
  haHYPE: {
    symbol: 'haHYPE',
    name: 'Harpoon HYPE Vault',
    priceId: '19aec77cb70be18c66df7afd33da651d7b376fd26f7c06f2e8b77536c820a281',
    decimals: 8,
    type: 'vault',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'Harpoon Vault token for staked HYPE',
    project: {
      name: 'Harmonix',
      url: 'https://app.harmonix.fi/'
    }
  },
  LHYPE: {
    symbol: 'LHYPE',
    name: 'Looped HYPE',
    priceId: '988d69733338cee47cba52201b8560874fb6ea4704b9e67b8e8c0f36fb99e734',
    decimals: 8,
    type: 'vault',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'Looped HYPE - Tokenized yield strategy for HYPE',
    project: {
      name: 'Looping Collective',
      url: 'https://www.loopingcollective.org/'
    }
  },
  MHYPE: {
    symbol: 'MHYPE',
    name: 'Magpie HYPE',
    priceId: 'e35aebd2d35795acaa2b0e59f3b498510e8ef334986d151d1502adb9e26234f7',
    decimals: 8,
    type: 'lst',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'LST version of HYPE token by Magpie',
    project: {
      name: 'Hyperpie',
      url: 'https://www.hyperliquid.magpiexyz.io/stake'
    }
  },
  stHYPE: {
    symbol: 'stHYPE',
    name: 'Staked HYPE',
    priceId: '068cd0617cbdd1dda615ed2b5ab4fe07d2e9f46347f5e785484844aa10d22dc5',
    decimals: 8,
    type: 'lst',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'Liquid staking token for HYPE by StakedHYPE',
    isUsdPrice: true,
    project: {
      name: 'StakedHYPE',
      url: 'https://www.stakedhype.fi/'
    }
  },
  hwHYPE: {
    symbol: 'hwHYPE',
    name: 'Hyperwave HYPE',
    priceId: 'abaed880ac0af9f7990b5092407eb007752937a12470242082d5477da7465b1c',
    decimals: 8,
    type: 'vault',
    referenceTokenId: REFERENCE_TOKEN.priceId,
    description: 'Hyperwave Vault token for HYPE',
    project: {
      name: 'Hyperwave',
      url: 'https://app.hyperwavefi.xyz/vaults/hwhype'
    }
  }
};