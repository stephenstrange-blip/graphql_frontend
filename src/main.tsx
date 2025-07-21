import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Client, cacheExchange, fetchExchange, Provider } from 'urql'


const client = new Client({
  url: import.meta.env.VITE_API_URL,
  exchanges: [cacheExchange, fetchExchange]
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>,
)
