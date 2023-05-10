import { apiHooks } from '@/api/hooks';
import React, { useEffect } from 'react';
import { Article } from '../components/article.component';
import { Loading } from '../components/loading.component';

export const ArticleListContainer = (): JSX.Element => {
    const { data, isLoading, isSuccess } = apiHooks.article.useGetArticles();

    useEffect(() => {
        if (isSuccess && document.location.hash) {
            location.hash = document.location.hash;
        }
    }, [isSuccess]);
    return (
        <Loading isLoading={isLoading}>
            <>
                {data?.items?.map((item, index) => {
                    return (
                        <Article
                            key={item.id}
                            id={item.id}
                            title={item.name}
                            content={item.content}
                            dateObj={item.dateObj}
                            showDivider={index + 1 !== data?.items?.length}
                        />
                    );
                })}

                {/* Pager*/}
                {/* <div className="d-flex justify-content-end mb-4">
                <a className="btn btn-primary text-uppercase" href="#!">
                    Older Posts →
                </a>
            </div> */}
            </>
        </Loading>
    );
};
