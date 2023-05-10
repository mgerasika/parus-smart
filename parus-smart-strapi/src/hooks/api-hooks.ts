import { article } from './article.hook';
import { faq } from './faq.hook';
import { gtableConfig } from './gtable-config.hook';
import { gtable } from './gtable.hook';
import { page } from './page.hook';
import { viberSubscriber as viberSubscriber } from './viber-subscriber.hook';

export const apiHooks = {
    gtableConfig,
    article,
    faq,
    page,
    viberSubscriber,
    gtable,
};
