import dayjs from 'dayjs';
export interface IArticleDto {
    id: string;
    name: string;
    content: string;
    date: string;
    dateObj: Date;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createArticleDto = (item: any): IArticleDto => {
    return {
        id: item.id,
        name: item.attributes.name,
        content: item.attributes.content,
        date: item.attributes.date,
        dateObj: dayjs(item.attributes.date).toDate(),
    };
};
