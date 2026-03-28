# 🚀 Deploy to Vercel - Complete Guide

Your trading platform is ready for deployment! Here's everything you need:

---

## ✅ Pre-Deployment Checklist

- [x] Token created: `FY4pnmQ8yQq94jUwEfjnhy93D14BNV6Q5sKSs5Sn8Grw`
- [x] Pool created: `D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6`
- [x] Environment file configured: `.env.local`
- [x] Trading UI ready
- [ ] Dependencies installed
- [ ] Tested locally
- [ ] Deployed to Vercel

---

## Step 1: Install Dependencies

```bash
cd /home/jay/.openclaw/workspace/simple-token-platform/trading-platform
npm install
```

Expected packages:
- `@solana/wallet-adapter-react`
- `@solana/wallet-adapter-react-ui`
- `@solana/wallet-adapter-wallets`
- `@solana/web3.js`
- `next`
- `react`
- `react-dom`

---

## Step 2: Test Locally

```bash
npm run dev
```

Open http://localhost:3000

**What to check:**
- [ ] Wallet connect button appears
- [ ] Can connect Phantom/Solflare
- [ ] Pool address displays correctly
- [ ] Token name shows
- [ ] Buy/Sell buttons work (show alert)
- [ ] Network shows "devnet"

---

## Step 3: Prepare for Vercel

### Option A: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Deploy via GitHub

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - token trading platform"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Deploy!

---

## Step 4: Configure Environment Variables on Vercel

After deploying, add these environment variables in Vercel dashboard:

**Settings → Environment Variables:**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_POOL_ADDRESS` | `D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6` |
| `NEXT_PUBLIC_TOKEN_MINT` | `FY4pnmQ8yQq94jUwEfjnhy93D14BNV6Q5sKSs5Sn8Grw` |
| `NEXT_PUBLIC_TOKEN_NAME` | `Your Token Name` |
| `NEXT_PUBLIC_TOKEN_SYMBOL` | `TOKEN` |
| `NEXT_PUBLIC_TOKEN_DECIMALS` | `9` |
| `NEXT_PUBLIC_NETWORK` | `devnet` |
| `NEXT_PUBLIC_RPC_URL` | `https://api.devnet.solana.com` |

---

## Step 5: Test Live Deployment

1. Open your Vercel URL
2. Connect wallet
3. Verify pool info displays
4. Test buy/sell buttons

---

## 🎨 Customization Options

### Change Token Name/Symbol

Edit `.env.local`:
```env
NEXT_PUBLIC_TOKEN_NAME=Your Token Name
NEXT_PUBLIC_TOKEN_SYMBOL=TKN
```

### Add Logo

1. Add logo to `public/logo.png`
2. Update metadata in `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Trade $TKN',
  description: 'Trade Your Token on Meteora',
  icon: '/logo.png',
}
```

### Custom Colors

Edit `app/page.tsx` - change the gradient:
```tsx
bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900
```

To your preferred colors.

---

## 🚨 Important Notes

### Current Limitations

The current UI shows a message on buy/sell because **full swap integration requires**:

1. **Jupiter API** for best routing (recommended)
2. **OR** Direct Meteora SDK integration
3. **OR** Simple buy/sell with fixed price

### Next Steps for Full Trading

**Option 1: Jupiter Integration (Best UX)**
```typescript
// Use Jupiter API for swaps
const quote = await fetch('https://quote-api.jup.ag/v6/quote', {
  params: { inputMint, outputMint, amount, slippageBps }
});
```

**Option 2: Direct Meteora Pool Swap**
```typescript
import DLMM from '@meteora-ag/dlmm';
const pool = await DLMM.create(connection, poolAddress);
const swapTx = await pool.swap({ ... });
```

**Option 3: Redirect to Meteora**
```typescript
window.open(`https://app.meteora.ag/pools/${POOL_ADDRESS}`, '_blank');
```

---

## 📊 Add SOL Liquidity (Required for Trading)

Before users can trade, you MUST add SOL to the pool:

1. Go to https://app.meteora.ag (switch to devnet)
2. Find your pool: `D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6`
3. Click "Add Liquidity"
4. Add SOL (e.g., 0.5-1 SOL for testing)
5. Confirm transaction

**Without SOL liquidity, users cannot buy your token!**

---

## 🎉 Post-Deployment

### Share Your Platform

```
🚀 My token is LIVE!

Trade $TKN on my platform:
https://your-app.vercel.app

Token: FY4pnmQ8yQq94jUwEfjnhy93D14BNV6Q5sKSs5Sn8Grw
Pool: D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6
Network: Solana Devnet

#Solana #DeFi #Meteora
```

### Monitor Your Pool

- **Meteora:** https://app.meteora.ag/pools/D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6
- **Explorer:** https://explorer.solana.com/address/D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6?cluster=devnet

---

## Troubleshooting

**"Module not found" errors:**
```bash
npm install
```

**Environment variables not working:**
- Restart dev server
- Check Vercel dashboard → Settings → Environment Variables
- Redeploy after adding variables

**Wallet connect issues:**
- Make sure you're on devnet in your wallet
- Check that Solana is selected in wallet settings

**Pool info not showing:**
- Pool might not be indexed yet (wait 1-2 minutes)
- Verify pool address is correct
- Check Meteora API: https://dlmm-api.meteora.ag/pair/YOUR_POOL

---

## Ready to Deploy?

```bash
cd /home/jay/.openclaw/workspace/simple-token-platform/trading-platform
npm install
npm run dev  # Test locally first
npm install -g vercel
vercel --prod  # Deploy!
```

**Your platform will be live at:** `https://your-app.vercel.app`

Need help with Jupiter integration or adding more features? Just ask! 🚀
