export interface IViberUnsubscribeMessage {
    event: 'unsubscribed';
    timestamp: number;
    chat_hostname: string;
    user_id: string;
    message_token: string;
}
