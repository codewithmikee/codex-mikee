import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Workspace - Shell Generator',
  description: 'Generate shell scripts using AI with the proper monorepo structure'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        <div className="flex h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
