import './globals.css'
import type { Metadata } from 'next'
import { WalletAdapterProvider } from './components/WalletAdapter'

export const metadata: Metadata = {
  title: 'Token Trading Platform',
  description: 'Trade tokens powered by Meteora DLMM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletAdapterProvider>
          {children}
        </WalletAdapterProvider>
      </body>
    </html>
  )
}
