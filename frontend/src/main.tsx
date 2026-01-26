
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { initializeTheme } from './hooks/useTheme'

// Initialize theme before React renders to prevent flash
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <App />
)
