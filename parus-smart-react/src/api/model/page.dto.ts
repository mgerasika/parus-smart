import dayjs from 'dayjs';
export interface IPageDto {
    id: string;
    title: string;
    content: string;
    date: string;
    dateObj: Date;
    type: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPageDto = (item: any): IPageDto => {
    return {
        id: item.id,
        title: item.attributes.name,
        content: item.attributes.content,
        date: item.attributes.date,
        dateObj: dayjs(item.attributes.date).toDate(),
        type: item.attributes.type,
    };
};
