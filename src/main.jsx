import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./pages/App.jsx";
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BooKingContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </AuthProvider>
  </StrictMode>
)
