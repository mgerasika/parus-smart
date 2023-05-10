import { IViberActionArg } from '../interfaces/viber-action-arg.interface';
import { ILinkItem } from './make-links.util';

interface IProps<T> {
    link: ILinkItem;
    actionName?: keyof T;
    actionArgument?: string;
}

export function getViberActionId<T>({ link, actionName, actionArgument }: IProps<T>): string {
    const data: IViberActionArg = {
        link: link.toString(),
        actionName: actionName ? actionName.toString() : undefined,
        actionArgument,
    };
    return JSON.stringify(data);
}
