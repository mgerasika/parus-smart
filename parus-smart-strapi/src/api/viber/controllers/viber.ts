/**
 * A set of functions called "actions" for `viber`
 */

import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { EViberEventType } from '@src/enums/viber-event-type.enum';
import { apiHooks } from '@src/hooks/api-hooks';
import { IViberActionArg } from '@src/interfaces/viber-action-arg.interface';
import { IViberConversationStartedMessage } from '@src/interfaces/viber-conversation-started-message.interface';
import { IViberMessage } from '@src/interfaces/viber-message.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberResponse } from '@src/interfaces/viber-response.interface';
import { IViberUnsubscribeMessage } from '@src/interfaces/viber-unsubscribe.interface';
import { sendMessageAsync } from '@src/shared/send-message-to-viber.util';
import { renderToStringAsync } from '@src/viber-components/render-to-string-async';

export default {
    index: async (ctx: any): Promise<any> => {
        try {
            const request: IViberRequest = {
                actionArg: {
                    link: VIBER_LINKS.faq.toString(),
                },
                body: {
                    sender: {
                        id: 'id',
                    },
                },
            } as any;

            const response = {
                message: await renderToStringAsync(request),
            };
            //   const viberPage = viberService.find(VIBER_LINKS.news.toString());
            //   const response = await viberPage.indexAsync({
            //     actionName: undefined,
            //     body: { sender: { id: "" } as any } as any,
            //   });
            console.log('response = ', response);
            ctx.body = JSON.stringify(response.message, null, 2);
        } catch (err) {
            console.log('error ', err);
            ctx.body = err;
        }
    },

    webHook: async (ctx: any): Promise<any> => {
        try {
            const requestBody = ctx.request.body;
            console.log('webhook_request body = ', requestBody);
            let res: IViberResponse | undefined = undefined;
            if (requestBody.event === EViberEventType.message) {
                const body = requestBody as IViberMessage;
                let actionArg: IViberActionArg | undefined = { link: '' };
                try {
                    actionArg = JSON.parse(body.message.tracking_data || body.message.text) as IViberActionArg;
                } catch {
                    actionArg = { link: '' };
                }
                const result = await renderToStringAsync({
                    body,
                    actionArg,
                });
                res = {
                    message: result.json,
                };
            } else if (requestBody.event === EViberEventType.conversation_started) {
                const body = requestBody as IViberConversationStartedMessage;

                await apiHooks.viberSubscriber.useCreateSubscriptionAsync({
                    avatar: body.user.avatar,
                    full_name: body.user.name,
                    viber_id: body.user.id,
                });

                const result = await renderToStringAsync({
                    conversation_started_body: body,

                    actionArg: {
                        link: VIBER_LINKS.welcome.toString(),
                    },
                });
                res = {
                    message: result.json,
                };
            } else if (requestBody.event === EViberEventType.subscribed) {
                res = {
                    message: 'subscribed',
                };
            } else if (requestBody.event === EViberEventType.unsubscribed) {
                const body = requestBody as IViberUnsubscribeMessage;

                //remove from database
                await apiHooks.viberSubscriber.useDeleteSubscriptionByViberIdAsync(body.user_id);

                res = {
                    message: 'unsubscribed',
                };
            }
            console.log('webhook_response = ', res);
            if (res && res.message) {
                await sendMessageAsync(res.message);
            }
            ctx.body = 'OK';
        } catch (err) {
            console.log('error', err);
            ctx.body = err;
            ctx.status = 400;
        }
    },
};
