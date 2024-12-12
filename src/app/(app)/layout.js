import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout