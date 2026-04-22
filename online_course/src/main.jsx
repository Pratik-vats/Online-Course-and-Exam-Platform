import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/courses.css'
import './styles/dashboard.css'
import './styles/exam.css'
import './styles/login.css'
import './styles/register.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
