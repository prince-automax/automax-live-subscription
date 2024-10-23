import "../globals.css";
import Layout from "../components/layouts/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apolloClient";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        // alert( e?.response?.errors[0]?.message?.substring(e.response.errors[0].message.indexOf(":")+1) ?? 'Something went wrong !');
      },
    },
  },
});

// console.log('apolloClient',apolloClient);


export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Toaster />
        </Layout>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
