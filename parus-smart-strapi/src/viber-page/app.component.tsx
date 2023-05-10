import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import React from 'react';
import { ContactsPage } from './contacts-page.component';
import { DocumentsPage } from './documents-page.component';
import { ExitPage } from './exit-page.component';
import { FaqPage } from './faq-page.component';
import { FeedbackPage } from './feedback-page.component';
import { IndexPage } from './index-page.component';
import { NewsPage } from './news-page.component';
import { NotFoundPage } from './not-found-page.component';
import { PersonalPage } from './personal-page.component';
import { WelcomePage } from './welcome-page.component';

interface IProps {
    request: IViberRequest;
}
export const App = ({ request }: IProps): JSX.Element => {
    const {
        actionArg: { link },
    } = request;

    switch (link) {
        case VIBER_LINKS.welcome.toString():
            return <WelcomePage request={request} />;

        case VIBER_LINKS.index.toString():
            return <IndexPage request={request} />;

        case VIBER_LINKS.exit.toString():
            return <ExitPage request={request} />;

        case VIBER_LINKS.news.toString():
            return <NewsPage request={request} />;

        case VIBER_LINKS.documents.toString():
            return <DocumentsPage request={request} />;

        case VIBER_LINKS.faq.toString():
            return <FaqPage request={request} />;

        case VIBER_LINKS.personal.toString():
            return <PersonalPage request={request} />;

        case VIBER_LINKS.feedback.toString():
            return <FeedbackPage request={request} />;

        case VIBER_LINKS.contacts.toString():
            return <ContactsPage request={request} />;

        default:
            return <NotFoundPage request={request} />;
    }
};
