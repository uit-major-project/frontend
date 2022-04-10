import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
