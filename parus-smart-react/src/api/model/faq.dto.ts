import dayjs from 'dayjs';
export interface IFaqDto {
    id: string;
    title: string;
    content: string;
    date: string;
    dateObj: Date;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createFaqDto = (item: any): IFaqDto => {
    return {
        id: item.id,
        title: item.attributes.name,
        content: item.attributes.content,
        date: item.attributes.date,
        dateObj: dayjs(item.attributes.date).toDate(),
    };
};
