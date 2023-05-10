import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    children?: ReactNode;
}
export const ViberRichMedia = ({ children }: IProps): JSX.Element => {
    return (
        <Json
            json={{
                Type: 'rich_media',
                BgColor: '#FFFFFF',
            }}
        >
            {children ? <>,"Buttons":[{children}]</> : null}
        </Json>
    );
};
