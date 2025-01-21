import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/app/global.css'
import QueryProvider from '@/providers/QueryProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className="bg-body-meli"
        style={{ fontFamily: 'var(--font-proxima)' }}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
