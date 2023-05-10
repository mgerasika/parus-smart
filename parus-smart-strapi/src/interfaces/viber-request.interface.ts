import { IViberActionArg } from './viber-action-arg.interface';
import { IViberConversationStartedMessage } from './viber-conversation-started-message.interface';
import { IViberMessage } from './viber-message.interface';

export interface IViberRequest {
    body?: IViberMessage;
    conversation_started_body?: IViberConversationStartedMessage;
    actionArg: IViberActionArg;
}
