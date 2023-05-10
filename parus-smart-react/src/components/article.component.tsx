import { formatDate } from '@/api/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface IProps {
    id: string;
    title: string | undefined;
    content: string;
    dateObj: Date | undefined;
    showDivider: boolean;
}
export const Article = ({ title, id, content, dateObj, showDivider }: IProps): JSX.Element => {
    return (
        <div>
            <div className="post-preview">
                {title && (
                    <a href={`#${id}`} id={id}>
                        <h2 className="post-title">{title}</h2>
                    </a>
                )}

                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {dateObj && <i className="post-subtitle">Posted by Admin, {formatDate(dateObj)}</i>}
            {showDivider && <hr className="my-4" />}
        </div>
    );
};
