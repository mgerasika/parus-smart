import { apiHooks } from '@/api/hooks';
import { IGetGTableListRequest } from '@/api/hooks/api-gtable.hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Admin(): JSX.Element {
    const router = useRouter();
    const [state] = useState<IGetGTableListRequest>({
        index: 1,
        query: {
            month: 'october',
            tabName: 'Аркуш1',
        },
    });

    useEffect(() => {
        document.addEventListener('keyup', (e: any) => {
            if (e.keyCode === 13) {
                alert(e.keyCode + ' value = ' + e.target.value);
            }
        });

        (document.getElementById('id1') as any).focus();
    }, []);
    useEffect(() => {
        if (!localStorage.getItem('auth2')) {
            // router.push('/');
        }
    }, [router]);
    const { data: configs } = apiHooks.gtable.useGetGTableConfigList();
    const { data: tableList } = apiHooks.gtable.useGetGTableList(state, { enabled: true });

    console.log('configs', configs);
    console.log('tableList', tableList);
    return (
        //https://developers.google.com/identity/sign-in/web/build-button
        <>
            <>
                <input id="id0" type="number" tabIndex={-1} />
                <input id="id1" type="number" tabIndex={-1} />
                <input type="button" value="button22" tabIndex={-1} />
                <input type="number" tabIndex={-1} />
            </>
        </>
    );
}
