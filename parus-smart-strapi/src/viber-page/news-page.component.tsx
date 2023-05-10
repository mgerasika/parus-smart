import { ENV } from '@src/constants/env.constant';
import { IArticleDto } from '@src/dto/article.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { apiHooks } from '@src/hooks/api-hooks';
import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { calcPaging } from '@src/utils/calc-paging.util';
import { Paging } from '@src/viber-components/paging.component';
import { useServerEffect } from '@src/viber-components/use-server-effect.hook';
import { ViberCard } from '@src/viber-components/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const NewsPage = ({ request: { actionArg, body } }: IProps): JSX.Element => {
    const [articles] = useServerEffect<IApiResult<IArticleDto[]>>(
        undefined,
        'articles',
        apiHooks.article.useGetArticlesAsync,
    );

    const link = actionArg?.link;
    const currentPage = actionArg.actionArgument || 0;
    const { items, totalPages } = calcPaging({
        currentPage,
        inputItems: articles?.data || [],
    });
    return (
        <ViberMessage
            type={EViberMessageType.rich_media}
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
                    <Paging currentPage={currentPage} link={link} totalPages={totalPages} />
                </ViberKeyboard>
            }
            rich_media={
                <ViberRichMedia>
                    {items.map((article, index) => (
                        <div key={article.id}>
                            <ViberCard
                                link={`${ENV.FRONTEND_URL}#${article.id}`}
                                id={article.id}
                                title={article.name}
                                description={article.content}
                            />
                            {index !== items.length - 1 ? ',' : null}
                        </div>
                    ))}
                </ViberRichMedia>
            }
        />
    );
};
