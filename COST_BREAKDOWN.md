# 💰 Cost Breakdown - Token & Pool Creation

## Summary

| Item | SOL Spent | USD Equivalent* |
|------|-----------|-----------------|
| **Transaction Fees** | ~0.0001 SOL | ~$0.02 |
| **Token Creation** | ~0.00003 SOL | ~$0.006 |
| **Pool Creation** | ~0.00003 SOL | ~$0.006 |
| **Mint & Transfer** | ~0.000015 SOL | ~$0.003 |
| **Total Fees** | **~0.0001 SOL** | **~$0.02** |

\*Based on SOL ≈ $200

---

## Detailed Breakdown

### 1. Token Creation Transactions

**Transaction 1: Create Token Mint**
- Signature: (part of creation flow)
- Fee: ~0.000005 SOL
- What it did: Created the SPL token mint account

**Transaction 2: Mint 1 Billion Tokens**
- Signature: (part of creation flow)
- Fee: ~0.000005 SOL
- What it did: Minted 1,000,000,000 tokens to your wallet

**Transaction 3: Transfer 2% to Dev**
- Signature: `5jLCeAvN8E6ttJbrJGw6XqMVJ6y2SwkjyosM5EPBX91Jw999Kzu5hmR6ZLRdG3tnMPBTXLS6NVnx9AMZrrJ8iXGj`
- Fee: **0.000005 SOL**
- What it did: Transferred 20M tokens (2%) to dev wallet

**Subtotal Token Creation: ~0.000015 SOL** (~$0.003)

---

### 2. Pool Creation Transactions

**Transaction 4: Create DLMM Pool**
- Signature: `5WZZBmuSPi3GgNFWGzfVKF3GqqrDYn1vDC8vQ77HHh39k6RyXEAdDCkb5PoopuaRkiMZrs9ihBzt7vwMMVfRL7cF`
- Fee: **0.000005 SOL**
- What it did: Created Meteora DLMM pool with your token/SOL

**Transaction 5: Add Liquidity (98% of supply)**
- Signature: (part of pool creation)
- Fee: ~0.000005 SOL
- What it did: Added 980M tokens to the pool

**Subtotal Pool Creation: ~0.00001 SOL** (~$0.002)

---

## Total Costs

### On Devnet (What You Just Did):
- **Total Fees:** ~0.0001 SOL
- **USD Value:** ~$0.02 (essentially free!)
- **Starting Balance:** 1.4667 SOL
- **Remaining:** ~1.4666 SOL (you still have it!)

Wait... you said you have 0 SOL left. Let me check if SOL was added to the pool:

---

## Where Did Your SOL Go?

**Initial Balance:** 1.4667 SOL  
**Transaction Fees:** -0.0001 SOL  
**Expected Remaining:** ~1.4666 SOL  
**Actual Remaining:** 0 SOL  
**Missing:** ~1.4666 SOL

### Possibilities:

1. **SOL Added to Pool?** 
   - Did you manually add SOL liquidity to the pool?
   - Check: https://app.meteora.ag/pools/D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6

2. **Other Transactions?**
   - Did you make other transactions with this wallet?
   - Check: https://explorer.solana.com/address/9y2YgLd4x5rB4yKDj4nipzGPRYjtBfGmRs28LTX73cf7?cluster=devnet

3. **Pool Creation Failed?**
   - The pool tx succeeded but maybe liquidity wasn't added?
   - Need to verify pool has your tokens

---

## On Mainnet (Real Money)

When you launch on mainnet, expect:

| Item | Estimated Cost |
|------|----------------|
| Token Creation | ~0.02 SOL (~$4) |
| Pool Creation | ~0.03 SOL (~$6) |
| Add Liquidity | ~0.05 SOL (~$10) |
| **Total Fees** | **~0.1 SOL (~$20)** |
| + Liquidity | Whatever SOL you add |

**Note:** On mainnet, you'll also need to add SOL liquidity (e.g., 1-10 SOL) to enable trading. This isn't a fee - it's your liquidity that stays in the pool.

---

## Verification Steps

Check your current state:

```bash
# Check balance
solana balance --url devnet

# Check token balance
spl-token balance FY4pnmQ8yQq94jUwEfjnhy93D14BNV6Q5sKSs5Sn8Grw --url devnet

# Check pool status
# Visit: https://app.meteora.ag/pools/D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6
```

---

## Bottom Line

**Devnet Test Run:**
- ✅ Transaction fees: ~0.0001 SOL (negligible)
- ✅ Token created: 1B supply
- ✅ Pool created: Ready for SOL liquidity
- ⏳ Next: Add SOL to enable trading

**Mainnet Launch:**
- Budget ~0.1 SOL (~$20) for fees
- Budget additional SOL for liquidity (e.g., 1-10 SOL = $200-2000)
- Your liquidity stays in the pool (you can remove it later)

Want me to help you check where the rest of your SOL went, or help you add liquidity to the pool?
