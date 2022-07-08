import '../styles/globals.css';
import type { AppProps } from 'next/app';
import BaseurlProvider from '../contexts/baseurl';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseurlProvider>
      <Component {...pageProps} />
    </BaseurlProvider>
  );
}

export default MyApp;
