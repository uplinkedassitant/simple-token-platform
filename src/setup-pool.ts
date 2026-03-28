import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import DLMM, { ActivationType, StrategyType } from '@meteora-ag/dlmm';
import fs from 'fs';
import path from 'path';
import { BN } from 'bn.js';

// Configuration
const CLUSTER = 'devnet'; // Using devnet
const CONNECTION_URL = clusterApiUrl(CLUSTER as 'mainnet-beta' | 'devnet');
const connection = new Connection(CONNECTION_URL, 'confirmed');

// Load payer wallet
const walletPath = path.join(__dirname, '..', 'dev-wallet.json');
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, 'utf-8')))
);

// Load token config
const configPath = path.join(__dirname, '..', 'token-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

console.log('🌊 Setting up Meteora DLMM Pool...\n');
console.log('Network:', CLUSTER);
console.log('Token Mint:', config.mint);
console.log('Total Supply:', Number(config.totalSupply).toLocaleString());

async function setupPool() {
  try {
    const YOUR_MINT = new PublicKey(config.mint);
    // Use SOL as quote token (can also use USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
    const QUOTE_MINT = new PublicKey('So11111111111111111111111111111111111111112'); // SOL
    
    console.log('\n📊 Step 1: Creating DLMM pool...');
    console.log('   Base Token:', YOUR_MINT.toBase58());
    console.log('   Quote Token:', QUOTE_MINT.toBase58(), '(SOL)');

    // Step 1: Create customizable permissionless pool
    const binStep = 100; // Common for volatile tokens (adjust for fees/price granularity)
    const feeBps = new BN(200); // 0.2% base fee (200 = 2%)
    const initialPrice = 0.000001; // Starting price in SOL per token (very low for fair launch)
    
    // Calculate active bin ID from initial price
    const activeId = new BN(Math.floor(Math.log(initialPrice) / Math.log(1 + binStep / 10000)));
    
    console.log('   Bin Step:', binStep);
    console.log('   Fee (bps):', feeBps.toString());
    console.log('   Initial Price:', initialPrice, 'SOL/token');
    console.log('   Active Bin ID:', activeId.toString());

    // Create the pool
    const createTx = await DLMM.createCustomizablePermissionlessLbPair2(
      connection,
      new BN(binStep),
      YOUR_MINT,
      QUOTE_MINT,
      activeId,
      feeBps,
      ActivationType.Timestamp,
      false, // no alpha vault
      payer.publicKey,
      undefined, // Changed from null to undefined
      false,
      { cluster: CLUSTER as 'mainnet-beta' | 'devnet' }
    );

    const signature = await connection.sendTransaction(createTx, [payer]);
    console.log('   Creating pool transaction:', signature);
    
    await connection.confirmTransaction(signature);
    console.log('✅ Pool created!');

    // Get pool address (derive from transaction or fetch via API)
    // For now, we'll fetch it from the Meteora API
    const poolAddress = await fetchPoolAddress(YOUR_MINT, QUOTE_MINT);
    console.log('\n📍 Pool Address:', poolAddress.toBase58());

    // Step 2: Create pool instance
    console.log('\n🏊 Step 2: Initializing pool instance...');
    const dlmmPool = await DLMM.create(connection, poolAddress);
    console.log('✅ Pool instance created');

    // Step 3: Add 98% single-sided liquidity
    console.log('\n💧 Step 3: Adding 98% liquidity (single-sided)...');
    
    const totalSupply = Number(config.totalSupply);
    const liquidityPercentage = 0.98; // 98%
    const liquidityTokens = BigInt(Math.floor(totalSupply * liquidityPercentage)) * BigInt(10 ** config.decimals);
    
    console.log('   Total tokens for liquidity:', BigInt(liquidityTokens).toString());
    console.log('   Percentage:', liquidityPercentage * 100 + '%');
    
    // Generate position keypair
    const positionKeypair = Keypair.generate();
    
    // Strategy for single-sided liquidity (only base token, no SOL/USDC)
    const strategy = {
      strategyType: StrategyType.Spot,
      minBinId: activeId.toNumber() - 10, // narrow range around initial price
      maxBinId: activeId.toNumber() + 10,
      singleSidedX: true // ONLY base token (your minted token)
    };

    console.log('   Strategy: Spot (single-sided)');
    console.log('   Min Bin ID:', strategy.minBinId);
    console.log('   Max Bin ID:', strategy.maxBinId);

    // Initialize position and add liquidity
    const addTx = await dlmmPool.initializePositionAndAddLiquidityByStrategy({
      positionPubKey: positionKeypair.publicKey,
      totalXAmount: new BN(liquidityTokens.toString()),
      totalYAmount: new BN(0), // no quote token (SOL/USDC)
      strategy,
      user: payer.publicKey,
      slippage: 1 // 1% slippage tolerance
    });

    const addSig = await connection.sendTransaction(addTx, [payer, positionKeypair]);
    console.log('   Adding liquidity transaction:', addSig);
    
    await connection.confirmTransaction(addSig);
    console.log('✅ Liquidity added!');

    // Step 4: Save pool configuration
    const poolConfig = {
      poolAddress: poolAddress.toBase58(),
      tokenMint: config.mint,
      quoteToken: QUOTE_MINT.toBase58(),
      initialPrice,
      binStep,
      feeBps: feeBps.toString(),
      liquidityPercentage: liquidityPercentage * 100,
      liquidityTokens: BigInt(liquidityTokens).toString(),
      positionPubKey: positionKeypair.publicKey.toBase58(),
      network: CLUSTER,
      createdAt: new Date().toISOString()
    };

    const poolConfigPath = path.join(__dirname, '..', 'pool-config.json');
    fs.writeFileSync(poolConfigPath, JSON.stringify(poolConfig, null, 2));

    console.log('\n💾 Pool configuration saved to pool-config.json');
    console.log('\n🎉 Pool setup complete!');
    console.log('\n📊 Pool Summary:');
    console.log(`   Pool Address: ${poolConfig.poolAddress}`);
    console.log(`   Token: ${poolConfig.tokenMint}`);
    console.log(`   Quote: SOL`);
    console.log(`   Initial Price: ${poolConfig.initialPrice} SOL/token`);
    console.log(`   Liquidity: ${poolConfig.liquidityPercentage}% (${BigInt(liquidityTokens).toLocaleString()} tokens)`);
    console.log(`   Network: ${poolConfig.network}`);
    
    console.log('\n📝 Next steps:');
    console.log('   1. Copy pool address to .env in Next.js app');
    console.log('   2. Deploy trading platform (npm run deploy-platform)');
    console.log('   3. Share your platform URL!');
    
    return poolAddress;
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  }
}

// Helper to fetch pool address from Meteora API
async function fetchPoolAddress(tokenMint: PublicKey, quoteMint: PublicKey): Promise<PublicKey> {
  // Wait a moment for the transaction to index
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    const response = await fetch(
      `https://dlmm-api.meteora.ag/pair/all?address=${tokenMint.toBase58()}`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Find the pool with matching quote token
      const pool = data.find((p: any) => 
        p.token_x_mint === tokenMint.toBase58() || 
        p.token_y_mint === tokenMint.toBase58()
      );
      
      if (pool) {
        return new PublicKey(pool.address);
      }
    }
  } catch (e) {
    console.log('   Could not fetch from API, deriving from transaction...');
  }
  
  // Fallback: derive from transaction (simplified - in production, parse transaction accounts)
  // For now, throw error to manually get from explorer
  throw new Error('Pool address derivation needed - check transaction on Solana explorer');
}

// Run if this is the main module
if (require.main === module) {
  setupPool().catch(console.error);
}

export { setupPool };
