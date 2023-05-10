import dayjs from 'dayjs';
export interface IPageDto {
    id: string;
    name: string;
    content: string;
    date: string;
    dateObj: Date;
    type: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPageDto = (item: any): IPageDto => {
    return {
        ...item,
        dateObj: dayjs(item.date).toDate(),
    };
};
