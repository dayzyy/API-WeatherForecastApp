import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <div style={{background: "var(--color-bg-primary)"}} className="h-screen w-screen flex flex-col gap-12 md:grid md:place-items-center px-4 overflow-x-hidden">
      <Header/>
      <App />
    </div>
  </Router>
)
