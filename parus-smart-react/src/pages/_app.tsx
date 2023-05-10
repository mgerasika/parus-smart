import { queryClient } from '@/shared/query-client';
import '@/styles/global.css';
import { AppProps } from 'next/app';
import Script from 'next/script';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../scss/styles.scss';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Script id="scripts.js" src="scripts.js" />
            <Component {...pageProps} />
            <Script id="bootstrap.js" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
            {/* The rest of your application */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
