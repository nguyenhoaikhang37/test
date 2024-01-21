import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { toast } from 'react-toastify'
import { variblesConfig } from '../config'
import { lsActions } from '../utils/auth'

const httpLink = new HttpLink({
  uri: variblesConfig.graphql_endpoint
})

let activeSocket: any, timedOut: any
const wsLink = new GraphQLWsLink(
  createClient({
    url: variblesConfig.ws_endpoint,
    keepAlive: 10_000,
    connectionParams: async () => {
      const token = lsActions.getToken()
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    },
    on: {
      connected: socket => (activeSocket = socket),
      ping: received => {
        console.log('[Socket]: ping')
        if (!received)
          // sent
          timedOut = setTimeout(() => {
            if (activeSocket.readyState === WebSocket.OPEN)
              activeSocket.close(4408, 'Request Timeout')
          }, 5_000) // wait 5 seconds for the pong and then close the connection
      },
      pong: received => {
        console.log('[Socket]: pong')
        if (received) clearTimeout(timedOut) // pong is received, clear connection close timeout
      }
    }
  })
)

const authLink = setContext((_, { headers }) => {
  const token = lsActions.getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )

        toast.error(message)

        if (extensions.code === 'UNAUTHENTICATED') {
          lsActions.clearLS(true)
        }
      })
    }

    if (networkError) {
      toast.error(`[Network error]: ${networkError}`)
      console.log(`[Network error]: ${networkError}`)
    }
  }
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const authSplitLink = ApolloLink.from([authLink, errorLink, splitLink])

const client = new ApolloClient({
  link: authSplitLink,
  cache: new InMemoryCache()
})

export default client
