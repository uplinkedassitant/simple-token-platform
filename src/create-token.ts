import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { createMint, mintTo, getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fs from 'fs';
import path from 'path';
import { BN } from 'bn.js';

// Configuration
const CLUSTER = 'devnet'; // Using devnet for testing
const CONNECTION_URL = clusterApiUrl(CLUSTER as 'mainnet-beta' | 'devnet');
const connection = new Connection(CONNECTION_URL, 'confirmed');

// Load payer wallet from dev-wallet.json
const walletPath = path.join(__dirname, '..', 'dev-wallet.json');
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, 'utf-8')))
);

console.log('🚀 Creating SPL Token...\n');
console.log('Network:', CLUSTER);
console.log('Payer:', payer.publicKey.toBase58());

async function createToken() {
  try {
    // Step 1: Create mint (standard SPL Token)
    console.log('\n📝 Step 1: Creating token mint...');
    
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      null, // no freeze authority
      9 // decimals
    );
    
    console.log('✅ Token mint created:', mint.toBase58());

    // Step 2: Mint 1 billion tokens
    console.log('\n💰 Step 2: Minting 1,000,000,000 tokens...');
    
    const totalSupply = 1_000_000_000; // 1 billion
    const decimals = 9;
    const amount = BigInt(totalSupply) * BigInt(10 ** decimals);
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      amount
    );
    
    console.log(`✅ Minted ${totalSupply.toLocaleString()} tokens`);
    console.log('   Token account:', tokenAccount.address.toBase58());

    // Step 3: Allocate 2% to developer wallet
    console.log('\n👨‍💻 Step 3: Allocating 2% to developer wallet...');
    
    const devWalletPubKey = process.env.DEV_WALLET_PUBLIC_KEY || payer.publicKey.toBase58();
    const devWallet = new PublicKey(devWalletPubKey);
    
    const devPercentage = 0.02; // 2%
    const devAmount = BigInt(Math.floor(totalSupply * devPercentage)) * BigInt(10 ** decimals);
    
    const devAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      devWallet
    );
    
    const transferTx = await transfer(
      connection,
      payer,
      tokenAccount.address,
      devAccount.address,
      payer,
      devAmount
    );
    
    console.log(`✅ Transferred ${devPercentage * 100}% (${(totalSupply * devPercentage).toLocaleString()} tokens) to developer`);
    console.log('   Dev wallet:', devWalletPubKey);
    console.log('   Dev token account:', devAccount.address.toBase58());
    console.log('   Transaction:', transferTx);

    // Step 4: Save configuration
    const config = {
      mint: mint.toBase58(),
      totalSupply,
      decimals,
      devWallet: devWalletPubKey,
      devAmount: (totalSupply * devPercentage).toLocaleString(),
      poolSupply: (totalSupply * (1 - devPercentage)).toLocaleString(),
      network: CLUSTER,
      createdAt: new Date().toISOString()
    };

    const configPath = path.join(__dirname, '..', 'token-config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    console.log('\n💾 Configuration saved to token-config.json');
    console.log('\n📊 Summary:');
    console.log(`   Token Mint: ${config.mint}`);
    console.log(`   Total Supply: ${config.totalSupply.toLocaleString()}`);
    console.log(`   Developer (2%): ${config.devAmount}`);
    console.log(`   For Pool (98%): ${config.poolSupply}`);
    console.log(`   Network: ${config.network}`);
    console.log('\n✅ Token creation complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Save the mint address above');
    console.log('   2. Run: npm run setup-pool (to create Meteora DLMM pool)');
    console.log('   3. Deploy the Next.js trading platform');
    
    return mint;
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  }
}

// Run if this is the main module
if (require.main === module) {
  createToken().catch(console.error);
}

export { createToken };
