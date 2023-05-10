import { Layout } from '@/components/layout.component';
import { ArticleListContainer } from '@/containers/article-list.container';
import Head from 'next/head';
import React from 'react';

export default function Index(): JSX.Element {
    return (
        <Layout title="ОСББ Парус Смарт">
            <Head>
                <title>Парус Смарт ОСББ</title>
                <meta name="google-site-verification" content="uwS1qsfu1Y54Is3jYQxmketNGTIVP__ZO-fHEUw1emY" />
                <meta
                    name="description"
                    content="TypeScript starter for Next.js that includes all you need to build amazing apps"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ArticleListContainer />
        </Layout>
    );
}
