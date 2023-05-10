import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import React from 'react';
import { ViberButton } from './viber-button.component';

interface IProps {
    link: string;
    currentPage: number;
    totalPages: number;
}

enum EAction {
    prev = 'prev',
    сurrent = 'current',
    next = 'next',
}
export const Paging = ({ link, currentPage, totalPages }: IProps): JSX.Element => {
    return (
        <>
            <ViberButton
                ActionType={currentPage === 0 ? 'none' : 'reply'}
                Text={currentPage === 0 ? '' : 'Попередня'}
                Columns={2}
                Rows={1}
                arg={{
                    link,
                    actionName: EAction.prev,
                    actionArgument: currentPage - 1,
                }}
            />
            ,
            <ViberButton
                ActionType="none"
                arg={undefined}
                Columns={2}
                Rows={1}
                Text={`${currentPage + 1} з ${totalPages}`}
            />
            ,
            <ViberButton
                ActionType={currentPage === totalPages - 1 ? 'none' : 'reply'}
                Text={currentPage === totalPages - 1 ? '' : 'Наступна'}
                Columns={2}
                Rows={1}
                arg={{
                    link,
                    actionName: EAction.next,
                    actionArgument: currentPage + 1,
                }}
            />
            ,
            <ViberButton
                Columns={6}
                Rows={1}
                Text="На головну"
                arg={{
                    link: VIBER_LINKS.index,
                }}
            />
        </>
    );
};
