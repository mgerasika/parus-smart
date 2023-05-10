import { Layout } from '@/components/layout.component';
import { FaqListContainer } from '@/containers/faq-list.container';
import React from 'react';

export default function FAQ(): JSX.Element {
    return (
        <Layout title="Часті питання">
            <FaqListContainer />
        </Layout>
    );
}
