import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from "./App.jsx";
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BooKingContext'

import { supabase } from './lib/supabase'

console.log('supabase connected:', supabase)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </AuthProvider>
  </StrictMode>
)
