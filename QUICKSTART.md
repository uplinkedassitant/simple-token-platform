# Quick Start Guide 🚀

## Step-by-Step: Launch Your Token in 5 Minutes

### Prerequisites
- [ ] Node.js 20+ installed
- [ ] Solana wallet with SOL (for fees)
- [ ] Dev wallet keypair file

---

## Step 1: Setup Project

```bash
cd /home/jay/.openclaw/workspace/simple-token-platform
npm install
```

---

## Step 2: Create Dev Wallet File

Save your wallet keypair as `dev-wallet.json` in the root directory:

```bash
# If you have a keypair.json from Solana CLI:
cp ~/.config/solana/id.json dev-wallet.json

# Or create from your secret key array
echo '[12,34,56,...,255]' > dev-wallet.json
```

**⚠️ Use a dev wallet with limited funds!**

---

## Step 3: Create Your Token

```bash
npm run create-token
```

**Output will show:**
``
✅ Token mint created: ABC123...XYZ
✅ Minted 1,000,000,000 tokens
✅ Transferred 2% to developer
``

**📝 Save the mint address!** (e.g., `ABC123...XYZ`)

---

## Step 4: Setup Meteora Pool

```bash
npm run setup-pool
```

**Output will show:**
``
✅ Pool created!
✅ Liquidity added!
Pool Address: DEF456...UVW
``

**📝 Save the pool address!**

---

## Step 5: Configure Trading Platform

```bash
cd trading-platform
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_POOL_ADDRESS=DEF456...UVW
NEXT_PUBLIC_TOKEN_MINT=ABC123...XYZ
NEXT_PUBLIC_TOKEN_NAME=YOUR_TOKEN_NAME
NEXT_PUBLIC_TOKEN_DECIMALS=9
```

---

## Step 6: Run Trading Platform

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Step 7: Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Follow the prompts, add your environment variables in Vercel dashboard.

---

## ✅ You're Live!

Your token is now:
- ✅ Created (1B supply)
- ✅ 2% to dev wallet
- ✅ 98% in Meteora pool
- ✅ Trading platform deployed

Share your platform URL and start trading! 🎉

---

## Testing First? Use Devnet!

In `src/create-token.ts` and `src/setup-pool.ts`:

```typescript
const CLUSTER = 'devnet'; // Change from 'mainnet-beta'
```

Get free devnet SOL: https://solfaucet.com/

---

## Need Help?

Check `README.md` for detailed docs, or review:
- `token-config.json` - Your token details
- `pool-config.json` - Your pool details
- `trading-platform/.env.local` - Platform config
