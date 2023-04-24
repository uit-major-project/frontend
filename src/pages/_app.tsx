import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/apolloClient';
import MainLayout from 'src/components/Layout/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log('HI FROM _app.tsx');
  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
