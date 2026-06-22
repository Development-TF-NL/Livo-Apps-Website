import './globals.css'
import Nav from './components/Nav'

export const metadata = {
  title: 'Livo Apps - Software that lightens the workflow',
  description: 'Elegant software that removes complexity from everyday business processes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
