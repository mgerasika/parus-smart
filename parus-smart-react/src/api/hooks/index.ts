import { article } from './api-article.hook';
import { auth } from './api-auth.hook';
import { faq } from './api-faq.hook';
import { gtable } from './api-gtable.hook';
import { page } from './api-page.hook';

export const apiHooks = {
    article,
    faq,
    page,
    auth,
    gtable,
};
