import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    sender: IViberSender;
    text?: string;
    type?: EViberMessageType;
    keyboard?: ReactNode;
    rich_media?: ReactNode;
    tracking_data?: string;
}
export const ViberMessage = ({
    sender,
    type = EViberMessageType.text,
    text,
    keyboard,
    tracking_data,
    rich_media,
}: IProps): JSX.Element => {
    return (
        <Json
            json={{
                receiver: sender.id,
                text,
                min_api_version: 7,
                tracking_data,
                type,
            }}
        >
            {keyboard ? <>, "keyboard":{keyboard}</> : null}
            {rich_media ? <>, "rich_media":{rich_media}</> : null}
        </Json>
    );
};
