import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'

const AppLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default AppLayout
