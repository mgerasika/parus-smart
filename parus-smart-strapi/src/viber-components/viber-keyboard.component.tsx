import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    children?: ReactNode;
}
export const ViberKeyboard = ({ children }: IProps): JSX.Element => {
    return (
        <Json
            json={{
                Type: 'keyboard',
                DefaultHeight: false,
            }}
        >
            {children ? <>,"Buttons":[{children}]</> : null}
        </Json>
    );
};
