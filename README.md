# Simple Token Platform - Solana + Meteora DLMM

A complete platform for launching SPL tokens on Solana with integrated Meteora DLMM liquidity pools and trading interface.

## 🚀 Features

- **Token Creation**: Create SPL tokens with custom supply and decimals
- **Meteora DLMM Integration**: Direct pool creation and liquidity provisioning
- **Trading Platform**: Next.js-based UI for buying and selling tokens
- **Wallet Support**: Compatible with Phantom, Solflare, and other Solana wallets
- **Direct Swaps**: Execute trades directly through Meteora pools
- **Real-time Balances**: Display user token and SOL balances
- **Pool Statistics**: Live liquidity and volume data

## 📦 What's Included

### Smart Contracts
- SPL Token minting and distribution
- Meteora DLMM pool creation
- Single-sided liquidity provisioning

### Frontend
- Next.js 14 + TypeScript
- Tailwind CSS styling
- Wallet adapter integration
- Responsive design

### Scripts
- Token creation script
- Pool setup script
- Liquidity provisioning

## 🛠️ Tech Stack

- **Blockchain**: Solana
- **Token Standard**: SPL Token (Token-2022 compatible)
- **Liquidity**: Meteora DLMM
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Wallet**: Solana Wallet Adapter
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 20+
- Solana wallet with SOL (for fees)
- Vercel account (for deployment)
- GitHub account (for repository)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_TOKEN_MINT=your_token_mint
NEXT_PUBLIC_TOKEN_NAME=Your Token
NEXT_PUBLIC_TOKEN_SYMBOL=TOKEN
NEXT_PUBLIC_TOKEN_DECIMALS=9
NEXT_PUBLIC_POOL_ADDRESS=your_pool_address
NEXT_PUBLIC_NETWORK=devnet
```

### 3. Create Token (Optional)

If you haven't created a token yet:

```bash
npm run create-token
```

### 4. Setup Pool (Optional)

If you haven't created a pool yet:

```bash
npm run setup-pool
```

### 5. Run Development Server

```bash
cd trading-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
simple-token-platform/
├── src/
│   ├── create-token.ts       # Token creation script
│   └── setup-pool.ts         # Pool setup script
├── trading-platform/
│   ├── app/
│   │   ├── page.tsx          # Main trading interface
│   │   ├── layout.tsx        # Root layout
│   │   └── components/
│   │       └── WalletAdapter.tsx
│   ├── .env.example          # Environment template
│   └── package.json
├── .gitignore                # Git ignore rules
├── .env.example              # Environment template
├── package.json              # Root package
└── README.md                 # This file
```

## 🔧 Available Scripts

### Root Directory

- `npm run create-token` - Create new SPL token
- `npm run setup-pool` - Setup Meteora pool
- `npm run dev:platform` - Run trading platform (dev)
- `npm run build:platform` - Build trading platform

### Trading Platform

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd trading-platform
   vercel --prod
   ```

3. **Configure Environment Variables** in Vercel dashboard

4. **Add Liquidity**: Add SOL to your Meteora pool to enable trading

### Environment Variables

See `.env.example` for required variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_TOKEN_MINT` | Your token's mint address | `ABC...123` |
| `NEXT_PUBLIC_TOKEN_NAME` | Token display name | `My Token` |
| `NEXT_PUBLIC_TOKEN_SYMBOL` | Token symbol | `MTK` |
| `NEXT_PUBLIC_TOKEN_DECIMALS` | Token decimals | `9` |
| `NEXT_PUBLIC_POOL_ADDRESS` | Meteora pool address | `DEF...456` |
| `NEXT_PUBLIC_NETWORK` | Network | `devnet` |

## 🔒 Security

### Protected Files

The following files are in `.gitignore` and should **NEVER** be committed:

- `dev-wallet.json` - Wallet private keys
- `.env.local` - Environment variables with secrets
- `*.key` - Private key files
- Any file containing private keys or secrets

### Best Practices

- ✅ Use environment variables for sensitive data
- ✅ Never commit wallet files or private keys
- ✅ Use separate wallets for development and production
- ✅ Test on devnet before mainnet deployment
- ✅ Review all transactions before signing

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_CHECKLIST.md) - Step-by-step deployment
- [Meteora Integration](./METEORA_INTEGRATION.md) - Technical details
- [Quick Start](./QUICKSTART.md) - Fast setup guide
- [Cost Breakdown](./COST_BREAKDOWN.md) - Fee information

## 🧪 Testing

1. **Test on Devnet**: Always test on devnet first
2. **Small Amounts**: Use small amounts when testing
3. **Verify Transactions**: Check transactions on Solana Explorer
4. **Test All Features**: Wallet connect, buy, sell, balances

## 📊 How It Works

### Token Creation
1. Script creates SPL token mint
2. Mints specified supply (e.g., 1 billion)
3. Allocates percentage to developer
4. Allocates remaining to liquidity pool

### Pool Creation
1. Creates Meteora DLMM pool
2. Configures bin step, fees, initial price
3. Adds single-sided liquidity (token only)
4. Pool ready for trading

### Trading Flow
1. User connects wallet
2. User enters amount to buy/sell
3. App fetches quote from Meteora pool
4. User confirms transaction
5. Swap executes on pool
6. Balances update automatically

## 🎯 Features Detail

### Wallet Integration
- Multi-wallet support (Phantom, Solflare, etc.)
- Automatic balance detection
- Transaction signing
- Error handling

### Pool Statistics
- Real-time liquidity data
- 24h trading volume
- Price information
- Fee tracking

### Swap Execution
- Direct pool integration
- Optimal routing
- Slippage protection
- Transaction confirmation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

ISC

## 🙏 Acknowledgments

- [Solana](https://solana.com/) - Blockchain platform
- [Meteora](https://meteora.ag/) - Dynamic liquidity market maker
- [Next.js](https://nextjs.org/) - React framework
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

## 📞 Support

- Documentation: See `/docs` folder
- Issues: GitHub Issues
- Meteora Docs: https://docs.meteora.ag/
- Solana Docs: https://docs.solana.com/

## ⚠️ Disclaimer

This software is for educational purposes. Use at your own risk. Always test on devnet before deploying to mainnet. Never share private keys or seed phrases.

---

**Built with ❤️ on Solana**
