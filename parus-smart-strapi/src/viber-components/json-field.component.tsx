import React from 'react';

interface IProps {
    name: string;
    value: any;
    coma?: boolean;
}

export const JsonField = ({ name, value, coma = true }: IProps): JSX.Element => {
    if (value && Object.keys(value).length >= 1) {
        <>
            "{name}":{JSON.stringify(value)} {coma ? ',' : undefined}
        </>;
    } else if (value && Array.isArray(value)) {
        return (
            <>
                "{name}":{JSON.stringify(value, null, 2)} {coma ? ',' : undefined}
            </>
        );
    }
    return (
        <>
            "{name}":{value ? JSON.stringify(value, null, 2) : undefined} {coma ? ',' : undefined}
        </>
    );
};
