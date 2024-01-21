import { ApolloProvider } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import client from './graphql/client.ts'
import './index.css'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
)
