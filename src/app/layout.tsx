import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/themeProvider'
import { ProgressBarProvider } from '@/components/providers/progressBarProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IoTNet - IoT Network Management Platform',
  description: 'Comprehensive IoT device management and monitoring platform',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=1" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=1" />
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <script>
          {`
            (function() {
              try {
                // Load theme from localStorage before hydration
                const primaryTheme = localStorage.getItem('selected-primary-theme') || 'blue';
                
                // Set CSS variables immediately
                document.documentElement.style.setProperty(
                  '--theme-primary-color',
                  'var(--primary-' + primaryTheme + ')'
                );
                document.documentElement.style.setProperty(
                  '--theme-primary-color-foreground',
                  'var(--primary-' + primaryTheme + '-foreground)'
                );
              } catch (e) {
                // Fallback to blue if localStorage fails
                document.documentElement.style.setProperty(
                  '--theme-primary-color',
                  'var(--primary-blue)'
                );
                document.documentElement.style.setProperty(
                  '--theme-primary-color-foreground',
                  'var(--primary-blue-foreground)'
                );
              }
            })();
          `}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
