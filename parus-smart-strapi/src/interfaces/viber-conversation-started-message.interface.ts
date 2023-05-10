import { EViberEventType } from '../enums/viber-event-type.enum';

export interface IViberConversationStartedMessage {
    event: EViberEventType;
    timestamp: number;
    chat_hostname: string;
    message_token: number;
    type: string;
    user: {
        id: string;
        name: string;
        avatar: string;
        language: string;
        country: string;
        api_version: number;
    };
    subscribed: boolean;
}
