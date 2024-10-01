import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/app/global.css'

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-body-meli`}>{children}</body>
    </html>
  )
}
