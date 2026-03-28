# Token Launch Checklist ✅

Use this checklist to track your token launch progress.

## Pre-Launch

- [ ] Read `QUICKSTART.md` for overview
- [ ] Review `README.md` for details
- [ ] Understand the costs (~0.1-0.2 SOL)
- [ ] Have a Solana wallet with SOL
- [ ] Decide: Devnet test or Mainnet launch?

## Setup (Do This First)

- [ ] Create `dev-wallet.json` with private key
- [ ] Install dependencies: `npm install`
- [ ] Test wallet connection (optional: check balance)
- [ ] Backup your wallet's private key (safely!)

## Token Creation

- [ ] Review `src/create-token.ts` configuration
- [ ] (Optional) Change `CLUSTER` to 'devnet' for testing
- [ ] Run: `npm run create-token`
- [ ] ✅ Token mint created
- [ ] ✅ 1B tokens minted
- [ ] ✅ 2% transferred to dev wallet
- [ ] Save mint address from output
- [ ] Verify `token-config.json` created

## Pool Setup

- [ ] Review `src/setup-pool.ts` configuration
- [ ] (Optional) Change `CLUSTER` to 'devnet' for testing
- [ ] Run: `npm run setup-pool`
- [ ] ✅ Pool created on Meteora
- [ ] ✅ 98% liquidity added (single-sided)
- [ ] Save pool address from output
- [ ] Verify `pool-config.json` created

## Trading Platform Setup

- [ ] Navigate to `trading-platform/`
- [ ] Install deps: `npm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add `NEXT_PUBLIC_POOL_ADDRESS` to `.env.local`
- [ ] Add `NEXT_PUBLIC_TOKEN_MINT` to `.env.local`
- [ ] Add `NEXT_PUBLIC_TOKEN_NAME` to `.env.local`
- [ ] Test locally: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Connect wallet
- [ ] Verify pool info displays

## Deploy to Vercel

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Run: `vercel --prod`
- [ ] Add environment variables in Vercel dashboard
- [ ] Verify deployment
- [ ] Test buy/sell on live site

## Post-Launch

- [ ] Add initial SOL liquidity to pool (optional but recommended)
- [ ] Submit to Jupiter aggregator
- [ ] Submit to DexScreener
- [ ] Share platform URL
- [ ] Monitor trades
- [ ] Consider revoking mint authority (for trust)

## Security Checklist

- [ ] Used dev wallet (not main wallet)
- [ ] Tested on devnet first (if possible)
- [ ] Saved all addresses securely
- [ ] Backed up private keys
- [ ] Understood all transaction costs
- [ ] Reviewed code in `src/` directory

## Documentation

- [ ] `README.md` - Full documentation
- [ ] `QUICKSTART.md` - Step-by-step guide
- [ ] `SETUP_COMPLETE.md` - What was created
- [ ] `token-config.json` - Your token details
- [ ] `pool-config.json` - Your pool details

## Need Help?

1. Check error messages in terminal
2. Review transaction on Solana explorer
3. Verify wallet has enough SOL
4. Check Meteora pool on their dashboard
5. Review Meteora docs: https://docs.meteora.ag/

## Success Metrics

- [ ] Token created and minted
- [ ] Pool has liquidity
- [ ] Trading platform works
- [ ] Can buy tokens
- [ ] Can sell tokens
- [ ] Pool appears on Jupiter/DexScreener

---

**Remember:** Always test on devnet before mainnet!

**Devnet Testing:**
1. Change `CLUSTER = 'devnet'` in both scripts
2. Get devnet SOL from https://solfaucet.com/
3. Run full flow
4. Verify everything works
5. Then switch to mainnet

Good luck! 🚀
