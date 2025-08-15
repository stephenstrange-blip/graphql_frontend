import { Client, cacheExchange, fetchExchange, subscriptionExchange, } from 'urql'
// import { } from "@urql/core"
import { createClient as createWSClient, type SubscribePayload } from "graphql-ws"
import { WebSocket } from 'ws';
const wsClient = createWSClient({
  url: import.meta.env.VITE_API_WS_URL,
  webSocketImpl: WebSocket
})

export const client = new Client({
  url: import.meta.env.VITE_API_URL,
  // fetchSubscriptions: true, *Only if you want to use HTTP transport with graphql, but we are using websockets
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(fetchBody, operation) {
        console.log("operation: ", operation)
        return {
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(
              fetchBody as SubscribePayload,
              sink,
            );
            return { unsubscribe: dispose }
          }
        }
      }
    })
  ]
})