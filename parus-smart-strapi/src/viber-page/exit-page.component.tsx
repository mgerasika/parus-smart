import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const ExitPage = ({ request: { body } }: IProps): JSX.Element => {
    return <ViberMessage sender={body?.sender as IViberSender} text={'Вихід'} />;
};
