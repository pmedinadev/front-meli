import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import MercadoPagoProvider from '@/providers/MercadoPagoProvider'

const AppLayout = ({ children }) => {
  return (
    <MercadoPagoProvider>
      <Navigation />
      <main className="main-content">{children}</main>
      <Footer />
    </MercadoPagoProvider>
  )
}

export default AppLayout
