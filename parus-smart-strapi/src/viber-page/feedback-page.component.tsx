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
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const FeedbackPage = ({ request: { body } }: IProps): JSX.Element => {
    const [pages] = useServerEffect<IApiResult<IPageDto[]>>(undefined, 'pages', apiHooks.page.useGetPagesAsync);

    const page = pages?.data?.find((page) => page.type === 'feedback');
    return (
        <ViberMessage
            type={EViberMessageType.text}
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={6} Rows={1} Text="На головну" arg={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
            text={
                page
                    ? getViberBigText({
                          id: page.id,
                          description: page.content,
                          link: `${ENV.FRONTEND_URL}feedback`,
                          title: page.name,
                      })
                    : undefined
            }
        />
    );
};
