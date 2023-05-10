import { IViberActionArg } from '@src/interfaces/viber-action-arg.interface';
import { getViberActionId } from '@src/utils/get-viber-action-id.util';
import { ILinkItem } from '@src/utils/make-links.util';
import React from 'react';
import { Json } from './json.component';

interface IProps {
    arg:
        | (Omit<IViberActionArg, 'link'> & {
              link: ILinkItem;
          })
        | undefined;

    Text: string;
    Columns: number;
    ActionType?: 'reply' | 'share-phone' | 'location-picker' | 'open-url' | 'none';
    Rows: number;
}
export const ViberButton = ({ arg, Columns, Rows, Text, ActionType = 'reply' }: IProps): JSX.Element => {
    return (
        <Json
            json={{
                Columns,
                Rows,
                Text,
                ActionType,
                ActionBody: arg
                    ? getViberActionId({
                          link: arg?.link,
                          actionName: arg.actionName,
                          actionArgument: arg.actionArgument,
                      })
                    : undefined,

                TextSize: 'regular',
            }}
        />
    );
};
