'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * QueryProvider - Proveedor de React Query para manejo global del caché
 * Envuelve la aplicación para proporcionar funcionalidad de caché y gestión de estado del servidor
 *
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto de React Query
 */
export default function QueryProvider({ children }) {
  // Inicializar QueryClient en estado para mantener la misma instancia entre renderizados
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tiempo que los datos se consideran frescos
            // Durante este tiempo, React Query no realizará nuevas peticiones
            staleTime: 1000 * 60 * 5, // 5 minutos

            // Tiempo que los datos permanecen en caché antes de ser eliminados
            // Si un componente solicita los mismos datos después de gcTime,
            // se realizará una nueva petición
            gcTime: 1000 * 60 * 60 * 24, // 24 horas

            retry: 1, // Reintentar una vez en caso de error
          },
        },
      }),
  )

  // Proveer el cliente de React Query a toda la aplicación
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
