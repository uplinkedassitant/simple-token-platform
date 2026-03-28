'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useState, useEffect, useCallback } from 'react';

// Configuration from environment
const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS || '';
const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT || '';
const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || 'TOKEN';
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || 'TOKEN';
const TOKEN_DECIMALS = parseInt(process.env.NEXT_PUBLIC_TOKEN_DECIMALS || '9');
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'devnet';

export default function Trade() {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [poolStats, setPoolStats] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);

  // Fetch pool stats and user balances
  useEffect(() => {
    if (POOL_ADDRESS && publicKey) {
      fetchPoolStats();
      fetchUserBalances();
    }
  }, [POOL_ADDRESS, publicKey, connection]);

  const fetchPoolStats = async () => {
    try {
      const response = await fetch(`https://dlmm-api.meteora.ag/pair/${POOL_ADDRESS}`);
      if (response.ok) {
        const data = await response.json();
        setPoolStats(data);
      }
    } catch (e) {
      console.log('Pool stats unavailable');
    }
  };

  const fetchUserBalances = async () => {
    if (!publicKey) return;
    
    try {
      // Get SOL balance
      const solBal = await connection.getBalance(publicKey);
      setSolBalance(solBal / 1e9);

      // Get token balance
      const tokenMint = new PublicKey(TOKEN_MINT);
      const tokenAccount = await connection.getTokenAccountBalance(
        (await connection.getTokenAccountsByOwner(publicKey, { mint: tokenMint })).value[0]?.pubkey
      );
      
      if (tokenAccount) {
        setUserBalance(parseFloat(tokenAccount.value.uiAmount?.toString() || '0'));
      }
    } catch (e) {
      console.log('Could not fetch balances:', e);
    }
  };

  const handleSwap = async (action: 'buy' | 'sell') => {
    if (!publicKey || !signTransaction || !sendTransaction) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Dynamically import Meteora DLMM
      const DLMM = (await import('@meteora-ag/dlmm')).default;
      
      const poolPubKey = new PublicKey(POOL_ADDRESS);
      const tokenMint = new PublicKey(TOKEN_MINT);
      
      // Create pool instance
      const pool = await DLMM.create(connection, poolPubKey);
      
      // Calculate amounts based on action
      const isBuy = action === 'buy';
      const inputAmount = parseFloat(amount);
      
      // For buy: user sends SOL, receives tokens
      // For sell: user sends tokens, receives SOL
      
      // Get swap quote
      const quote = await pool.getSwapQuote(
        isBuy ? new PublicKey('So11111111111111111111111111111111111111112') : tokenMint,
        isBuy ? tokenMint : new PublicKey('So11111111111111111111111111111111111111112'),
        BigInt(Math.floor(inputAmount * (isBuy ? 1e9 : Math.pow(10, TOKEN_DECIMALS)))),
        100 // 1% slippage
      );

      // Create swap transaction
      const swapTx = await pool.swap({
        user: publicKey,
        amount: BigInt(Math.floor(inputAmount * (isBuy ? 1e9 : Math.pow(10, TOKEN_DECIMALS)))),
        swapForY: isBuy,
        ...quote
      });

      // Sign and send transaction
      const signature = await sendTransaction(swapTx, connection);
      
      // Wait for confirmation
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      const actionText = isBuy ? 'Bought' : 'Sold';
      const tokenText = isBuy ? 'with SOL' : 'for SOL';
      
      alert(`✅ Success! ${actionText} ${amount} ${TOKEN_SYMBOL} ${tokenText}\n\nTransaction: ${signature.slice(0, 40)}...${signature.slice(-4)}`);
      
      // Refresh balances
      await fetchUserBalances();
      await fetchPoolStats();
      
    } catch (error: any) {
      console.error('Swap error:', error);
      let errorMessage = error.message || 'Unknown error occurred';
      
      // Common error handling
      if (errorMessage.includes('Insufficient liquidity')) {
        errorMessage = 'Insufficient liquidity in pool. Please add more SOL to the pool.';
      } else if (errorMessage.includes('Insufficient balance')) {
        errorMessage = 'Insufficient balance. Please check your wallet.';
      } else if (errorMessage.includes('User rejected')) {
        errorMessage = 'Transaction rejected by user.';
      }
      
      alert(`❌ Swap failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Trade {TOKEN_SYMBOL}</h1>
            <p className="text-sm text-gray-400">{TOKEN_NAME}</p>
          </div>
          <WalletMultiButton />
        </div>

        {/* Pool Info */}
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-300">Pool Address</p>
              <p className="text-xs text-gray-500 font-mono">
                {POOL_ADDRESS ? `${POOL_ADDRESS.slice(0, 6)}...${POOL_ADDRESS.slice(-4)}` : 'Not configured'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Network</p>
              <p className="text-xs text-gray-500 capitalize">{NETWORK}</p>
            </div>
          </div>
          
          {poolStats && (
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-400">Liquidity</p>
                  <p className="text-sm text-gray-300">
                    ${poolStats.liquidity_usd ? Number(poolStats.liquidity_usd).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">24h Volume</p>
                  <p className="text-sm text-gray-300">
                    ${poolStats.volume_24h_usd ? Number(poolStats.volume_24h_usd).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Balances */}
        {publicKey && (
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-300 mb-2">Your Balances</p>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-400">SOL</p>
                <p className="text-sm text-gray-300">
                  {solBalance ? `${solBalance.toFixed(4)} SOL` : 'Loading...'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{TOKEN_SYMBOL}</p>
                <p className="text-sm text-gray-300">
                  {userBalance !== null ? `${userBalance.toLocaleString()} ${TOKEN_SYMBOL}` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount ({TOKEN_SYMBOL})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
            step="any"
          />
        </div>

        {/* Buy/Sell Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSwap('buy')}
            disabled={loading || !publicKey}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Processing...' : `Buy ${TOKEN_SYMBOL} with SOL`}
          </button>
          
          <button
            onClick={() => handleSwap('sell')}
            disabled={loading || !publicKey}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Processing...' : `Sell ${TOKEN_SYMBOL} for SOL`}
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-gray-400 text-center">
            🔒 Powered by Meteora DLMM
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Direct pool swaps • No intermediaries
          </p>
        </div>

        {/* Wallet Status */}
        {!publicKey && (
          <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-300 text-center">
              👆 Connect your wallet to start trading
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
