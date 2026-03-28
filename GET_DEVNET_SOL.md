# Devnet SOL - Getting Started

## Your Devnet Wallet Address
``
6bXT9A4s1zaiPdK1pHAKy27QgFzSvfciuU2Kxbs5PSvy
``

## Option 1: Use the Official Faucet (Recommended)

1. Go to: **https://faucet.solana.com/**
2. Your wallet address should already be filled in
3. Click "Request Airdrop"
4. You can request up to **2 SOL** every 8 hours

## Option 2: Use Alternative Faucets

Try these if the main faucet is rate-limited:

- **Solana Faucet (QuickNode)**: https://faucet.quicknode.com/solana
- **Chainstack Faucet**: https://chainstack.com/blogs/devnet-faucets/
- **Supernode**: https://supernode.dev/faucet

## Option 3: Use a Different Devnet RPC

Some RPCs have their own faucets:

```bash
# Switch to a different devnet RPC
solana config set --url https://api.devnet.solana.com

# Then request airdrop
solana airdrop 2
```

## After Getting Devnet SOL

Verify your balance:

```bash
solana balance --url devnet
```

You should see something like:
```
2 SOL
```

## Then Continue with Token Creation

Once you have devnet SOL:

1. Copy your wallet keypair:
   ```bash
   cp /home/jay/.config/solana/id.json /home/jay/.openclaw/workspace/simple-token-platform/dev-wallet.json
   ```

2. Navigate to the project:
   ```bash
   cd /home/jay/.openclaw/workspace/simple-token-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create your token:
   ```bash
   npm run create-token
   ```

## Troubleshooting

**"Rate limit reached"**
- Wait 8 hours and try again
- Try a different faucet
- Use a different wallet address

**"Insufficient funds"**
- Make sure you have at least 1 SOL on devnet
- Request from faucet again

**"Transaction failed"**
- Check that you're on devnet: `solana config get`
- Verify balance: `solana balance`

---

**Your wallet address for faucet:**
```
6bXT9A4s1zaiPdK1pHAKy27QgFzSvfciuU2Kxbs5PSvy
```

Copy this address and paste it into any of the faucets above!
