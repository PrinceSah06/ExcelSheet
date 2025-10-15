import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api'
import { Provider } from "react-redux";
import store from "../src/store/store.config.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
     <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
    
  </StrictMode>,
)
