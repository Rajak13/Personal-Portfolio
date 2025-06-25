import '../src/components/LanguageSwitcher.jsx'
import LanguageSwitcher from '../src/components/LanguageSwitcher.jsx'
import './globals.css'

export const metadata = {
  title: 'Rajak Portfolio',
  description: 'Created with React and Vite'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <LanguageSwitcher />
        </div>
        {children}
      </body>
    </html>
  )
}
