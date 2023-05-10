import { formatDate } from '@/api/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Loading } from './loading.component';

interface IProps {
    isLoading: boolean;
    id: string;
    title: string | undefined;
    content: string;
    dateObj: Date | undefined;
    showDivider: boolean;
}
export const Page = ({ isLoading, title, id, content, dateObj, showDivider }: IProps): JSX.Element => {
    return (
        <Loading isLoading={isLoading}>
            {/* Post preview*/}
            <div className="post-preview">
                {title && (
                    <a>
                        <h2 className="post-title">{title}</h2>
                    </a>
                )}

                <div id={`#${id}`}></div>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {dateObj && <i className="post-subtitle">Posted by Admin, {formatDate(dateObj)}</i>}
            {/* Divider*/}
            {showDivider && <hr className="my-4" />}

            {/* Pager
            <div className="d-flex justify-content-end mb-4">
                <a className="btn btn-primary text-uppercase" href="#!">
                    Older Posts →
                </a>
            </div> */}
        </Loading>
    );
};
