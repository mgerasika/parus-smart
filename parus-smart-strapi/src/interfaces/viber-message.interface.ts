import { EViberEventType } from '../enums/viber-event-type.enum';
import { IViberSender } from './viber-sender.interface';

export interface IViberMessage {
    event: EViberEventType;
    timestamp: number;
    chat_hostname: string;
    message_token: number;
    sender: IViberSender;
    message: { text: string; type: string; tracking_data?: string; contact?: { phone_number: string } };
    silent: boolean;
}
