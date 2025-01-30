import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import client from './server/apollo-client.ts'
import { ApolloProvider } from '@apollo/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider >
  </StrictMode>,
)
