import React, { ReactNode } from 'react';

interface IProps {
    isArray: boolean;
    children: ReactNode;
}
export const JsonRoot = ({ isArray, children }: IProps): JSX.Element => {
    return isArray ? (
        <>
            {'['}
            {children}
            {']'}
        </>
    ) : (
        <>
            {'{'}
            {children}
            {'}'}
        </>
    );
};
