import React, { ReactNode } from 'react';
import { JsonRoot } from './json-root.component';

interface IProps {
    json: any;
    children?: ReactNode;
}
export const Json = ({ json, children }: IProps): JSX.Element => {
    let jsonStr = JSON.stringify(json);
    jsonStr = jsonStr.slice(1, jsonStr.length - 1);
    return (
        <JsonRoot isArray={Array.isArray(json)}>
            {jsonStr}
            {children}
        </JsonRoot>
    );
};
