import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const WelcomePage = ({ request: { conversation_started_body } }: IProps): JSX.Element => {
    return (
        <ViberMessage
            sender={conversation_started_body?.user as IViberSender}
            text={'Привіт! Це чат бот ОСББ Парус Смарт'}
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={3} Rows={1} Text="Почати" arg={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
        />
    );
};
