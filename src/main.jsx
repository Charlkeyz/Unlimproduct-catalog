import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextApiProvider from './components/ContextAPI/ContextApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextApiProvider>
      <App />
    </ContextApiProvider>
  </React.StrictMode>,
)
