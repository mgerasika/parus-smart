import { ENV } from '@src/constants/env.constant';
import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IPageDto } from '@src/dto/page.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { apiHooks } from '@src/hooks/api-hooks';
import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { getViberBigText } from '@src/viber-components/get-viber-big-text';
import { useServerEffect } from '@src/viber-components/use-server-effect.hook';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberCard } from '@src/viber-components/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const ContactsPage = ({ request: { body } }: IProps): JSX.Element => {
    const [pages] = useServerEffect<IApiResult<IPageDto[]>>(undefined, 'pages', apiHooks.page.useGetPagesAsync);

    const page = pages?.data?.find((page) => page.type === 'contacts');
    const SHOW_BIG_TEXT = true;
    return SHOW_BIG_TEXT ? (
        <ViberMessage
            type={EViberMessageType.text}
            sender={body?.sender as IViberSender}
            text={
                page
                    ? getViberBigText({
                          id: page.id,
                          description: page.content,
                          link: `${ENV.FRONTEND_URL}contact`,
                          title: page.name,
                      })
                    : undefined
            }
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={6} Rows={1} Text="На головну" arg={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
        />
    ) : (
        <ViberMessage
            type={EViberMessageType.rich_media}
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={6} Rows={1} Text="На головну" arg={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
            rich_media={
                <ViberRichMedia>
                    {page && (
                        <ViberCard
                            id={page.id}
                            link={`${ENV.FRONTEND_URL}contact`}
                            title={page.name}
                            description={page.content}
                            limit={Number.MAX_SAFE_INTEGER}
                        />
                    )}
                </ViberRichMedia>
            }
        />
    );
};
