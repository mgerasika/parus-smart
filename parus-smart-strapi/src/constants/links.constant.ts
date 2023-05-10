import { EMPTY_LINK_ITEM, ILinkItem, makeLinks } from '../utils/make-links.util';

interface IAppLink {
    welcome: ILinkItem;
    index: ILinkItem;

    news: ILinkItem;
    documents: ILinkItem;
    faq: ILinkItem;
    feedback: ILinkItem;
    contacts: ILinkItem;
    auth: {
        login: ILinkItem;
        signOut: ILinkItem;
    };
}

export const LINKS = makeLinks<IAppLink>({
    index: EMPTY_LINK_ITEM,
    welcome: EMPTY_LINK_ITEM,

    news: EMPTY_LINK_ITEM,
    documents: EMPTY_LINK_ITEM,
    faq: EMPTY_LINK_ITEM,
    feedback: EMPTY_LINK_ITEM,
    contacts: EMPTY_LINK_ITEM,
    auth: {
        login: EMPTY_LINK_ITEM,
        signOut: EMPTY_LINK_ITEM,
    },
});
