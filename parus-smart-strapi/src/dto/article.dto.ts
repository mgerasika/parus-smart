import dayjs from 'dayjs';

export interface IArticleDto {
    id: string;
    name: string;
    content: string;
    date: string;
    dateObj: Date;
}

export const createArticleDto = (item: any): IArticleDto => {
    return {
        ...item,
        dateObj: dayjs(item.date).toDate(),
    };
};
