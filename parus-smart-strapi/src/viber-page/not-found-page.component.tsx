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

export const NotFoundPage = ({ request: { body } }: IProps): JSX.Element => {
    return (
        <ViberMessage
            sender={body?.sender as IViberSender}
            text={'Сторінку не знайдено'}
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={3} Rows={1} Text="На головну" arg={{ link: VIBER_LINKS.index }} />,
                    <ViberButton Columns={3} Rows={1} Text="Вийти" arg={{ link: VIBER_LINKS.exit }} />
                </ViberKeyboard>
            }
        />
    );
};
