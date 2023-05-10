import { ViberServerContext } from '@src/shared/viber-server.context';
import { useContext, useState } from 'react';
export function useServerEffect<T>(initial: T | undefined, key: string, callback: () => Promise<T>): [T | undefined | null] {
    const context: any = useContext(ViberServerContext);
    const [data] = useState<T>(context[key] || initial);
    if (context.requests && !context[key]) {
        context.requests.push(callback().then((data) => (context[key] = data)));
    }
    return [data];
}
