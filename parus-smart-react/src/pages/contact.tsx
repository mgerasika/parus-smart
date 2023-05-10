import { EPageType } from '@/api/enum';
import { apiHooks } from '@/api/hooks';
import { Layout } from '@/components/layout.component';
import { Page } from '@/components/page.component';
import React from 'react';

export default function Contact(): JSX.Element {
    const { data: pages, isLoading } = apiHooks.page.useGatPages();
    const data = pages?.items?.find((p) => p.type == EPageType.Contacts);
    return (
        <Layout title={data?.title || ''}>
            {data && (
                <Page
                    isLoading={isLoading}
                    showDivider={false}
                    content={data.content}
                    dateObj={undefined}
                    id={data.id}
                    title={undefined}
                />
            )}
        </Layout>
    );
}
