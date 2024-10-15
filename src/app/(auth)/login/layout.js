export const metadata = {
  title: 'Ingresar tu e-mail para iniciar sesión',
}

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>{children}</main>
    </div>
  )
}

export default LoginLayout
