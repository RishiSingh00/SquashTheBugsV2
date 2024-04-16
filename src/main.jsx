import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseInitializer from './components/FirebaseInitializer.jsx'
import { GlobalStateProvider } from './components/GlobalStateProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <FirebaseInitializer /> {/* Add FirebaseInitializer component */}
     <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
)
