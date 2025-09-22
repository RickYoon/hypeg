# HyPeg 🎯

> HYPE ecosystem peg monitor for LSTs and vaults, tracking arbitrage opportunities powered by Pyth.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://hypeg.vercel.app)
[![Powered by Pyth](https://img.shields.io/badge/Powered%20by-Pyth-orange)](https://pyth.network/)

<p align="center">
  <img src="public/logo.svg" alt="HyPeg Logo" width="200"/>
</p>

## 🚀 Features

### Real-time Price Monitoring
- Integrated with Pyth's Hermes API for direct price feeds
- Auto-refresh every 10 seconds
- Multiple token support (HYPE, kHYPE, haHYPE, LHYPE, MHYPE, stHYPE)

### Arbitrage Opportunity Detection
- Automated peg deviation calculations
- Visual alerts for profitable opportunities
- Step-by-step arbitrage guides
- Direct links to trading platforms

### User-Friendly Interface
- Clean, modern dashboard design
- Color-coded status indicators
- Dark/light mode support
- Responsive layout

## 🛠 Technical Implementation

### Price Feed Integration
```typescript
// Example of price normalization using Pyth
export const normalizePythPrice = (pythPrice: PythPrice): number => {
  const price = BigInt(pythPrice.price);
  const expo = pythPrice.expo;
  return Number(price) * Math.pow(10, expo);
};
```

### Supported Tokens

| Token | Type | Description |
|-------|------|-------------|
| HYPE | Reference | Base HYPE token |
| kHYPE | LST | Kinetiq Liquid Staking |
| haHYPE | Vault | Harmonix Vault Token |
| LHYPE | Vault | Looping Collective Vault |
| MHYPE | LST | Magpie Liquid Staking |
| stHYPE | LST | StakedHYPE Token |

## 🏃‍♂️ Quick Start

1. Clone the repository
```bash
git clone https://github.com/RickYoon/hypeg.git
```

2. Install dependencies
```bash
cd hypeg
npm install
```

3. Start development server
```bash
npm run dev
```

## 🌟 Why HyPeg?

HyPeg democratizes arbitrage opportunities in the HYPE ecosystem by:
- Converting complex price data into actionable insights
- Providing real-time monitoring of peg status
- Enabling users to quickly identify and act on price inefficiencies
- Contributing to overall market efficiency

## 🔗 Links

- [Live Demo](https://hypeg.vercel.app)
- [GitHub Repository](https://github.com/RickYoon/hypeg)

## 🛠 Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Pyth Network](https://pyth.network/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the HYPE ecosystem