import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ⬅️ Importar los Providers necesarios
import { AuthProvider } from './context/AuthContext.jsx'; 
import { CarritoProvider } from './context/CarritoContext.jsx'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 1. Proveedor de Autenticación (AuthProvider)
      Debe ser el proveedor más externo para que los demás (como Carrito)
      puedan acceder a la información del usuario si es necesario.
    */}
    <AuthProvider>
        {/* 2. Proveedor del Carrito (CarritoProvider)
          Necesita acceso global para la gestión de productos.
        */}
        <CarritoProvider>
            
            {/* La aplicación principal, que contiene todas las rutas y componentes */}
            <App />
            
        </CarritoProvider>
    </AuthProvider>
  </StrictMode>,
);