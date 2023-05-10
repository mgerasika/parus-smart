import React from 'react';
import { Json } from './json.component';

const { markdownToTxt } = require('markdown-to-txt');

interface IProps {
    id: string;
    title: string;
    description: string;
    limit?: number;
    link: string;
}
export const ViberCard = ({ title, link, description, limit = 250 }: IProps): JSX.Element => {
    const titleTxt = title ? markdownToTxt(title) : title;
    const descriptionTxt = description ? markdownToTxt(description).toString().substr(0, limit) + '...' : '';
    return (
        <>
            <Json
                json={{
                    Columns: 6,
                    Rows: 6,
                    Text:
                        `<font color=#323232><b>${titleTxt}</b></font><font color=#777777><br></font><font color=#6fc133></font>` +
                        descriptionTxt,
                    ActionType: 'none',
                    ActionBody: link,
                    TextSize: 'medium',
                    TextVAlign: 'middle',
                    TextHAlign: 'left',
                }}
            />
            ,
            <Json
                json={{
                    Columns: 6,
                    Rows: 1,
                    ActionType: 'open-url',
                    ActionBody: link,
                    Text: '<font color=#8367db>ЧИТАТИ ПОВНІСТЮ</font>',
                    TextSize: 'small',
                    TextVAlign: 'middle',
                    TextHAlign: 'middle',
                }}
            />
        </>
    );
};
