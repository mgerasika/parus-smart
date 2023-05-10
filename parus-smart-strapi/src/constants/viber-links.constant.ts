import { EMPTY_LINK_ITEM, ILinkItem, makeLinks } from '../utils/make-links.util';

interface IViberAppLink {
    index: ILinkItem;
    welcome: ILinkItem;
    exit: ILinkItem;

    news: ILinkItem;
    documents: ILinkItem;
    faq: ILinkItem;
    feedback: ILinkItem;
    contacts: ILinkItem;
    personal: {
        info: ILinkItem;
        signOut: ILinkItem;
    };

    notFound: ILinkItem;
}

export const VIBER_LINKS = makeLinks<IViberAppLink>({
    index: EMPTY_LINK_ITEM,
    welcome: EMPTY_LINK_ITEM,
    exit: EMPTY_LINK_ITEM,

    news: EMPTY_LINK_ITEM,
    documents: EMPTY_LINK_ITEM,
    faq: EMPTY_LINK_ITEM,
    feedback: EMPTY_LINK_ITEM,
    contacts: EMPTY_LINK_ITEM,
    personal: {
        info: EMPTY_LINK_ITEM,
        signOut: EMPTY_LINK_ITEM,
    },

    notFound: EMPTY_LINK_ITEM,
});
