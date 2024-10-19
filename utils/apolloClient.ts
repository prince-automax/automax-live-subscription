
// import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
// import { onError } from '@apollo/client/link/error'; // Import onError for error handling
// import { getMainDefinition } from '@apollo/client/utilities';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';

// // Conditionally import 'ws' only in Node.js
// const isNode = typeof window === 'undefined';
// const WebSocketImpl = isNode ? require('ws') : WebSocket;
// const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// console.log('456',localStorageToken);


// // const httpLink = new HttpLink({
// //   uri: 'https://api-dev.autobse.com/graphql',
// // });

// const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(
//   createClient({
//     url: 'wss://api-dev.autobse.com/graphql',
//     connectionParams: {
//       authToken: localStorageToken ? `Bearer ${localStorageToken}` : null, // Make sure the token is valid for WS
//     },
//   })
// ) : null;


// // Error handling link
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.error(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   }
//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//   }
// });

// const link = typeof window !== 'undefined' && wsLink
//   && split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === 'OperationDefinition' &&
//           definition.operation === 'subscription'
//         );
//       },
//       wsLink,
//       // httpLink,
//     )
//    // Only use httpLink for server-side rendering

//   const client = new ApolloClient({
//     link: link, // Properly handled for both client and server-side
//     cache: new InMemoryCache(),
//     ssrMode: typeof window === 'undefined', // Enable SSR mode for server-side rendering
//   });
  
//   export default client

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error'; // Import onError for error handling
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// Conditionally import 'ws' only in Node.js
const isNode = typeof window === 'undefined';
const WebSocketImpl = isNode ? require('ws') : WebSocket;
const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
console.log('456', localStorageToken);

// Create the WebSocket link
const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(
  createClient({
    url: 'wss://api-dev.autobse.com/graphql',
    connectionParams: {
      authToken: localStorageToken ? `Bearer ${localStorageToken}` : null, // Ensure the token is valid for WS
    },
  })
) : null;

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Assign only the wsLink to the Apollo Client
const link = wsLink; // Use wsLink directly for subscriptions

const client = new ApolloClient({
  link: link, // Set the link to the WebSocket link
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined', // Enable SSR mode for server-side rendering
});

export default client;
