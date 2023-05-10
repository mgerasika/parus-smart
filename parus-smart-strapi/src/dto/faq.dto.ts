export interface IFaqDto {
    id: string;
    name: string;
    content: string;
    date: string;
    dateObj: Date;
}
export const createFaqDto = (item: any): IFaqDto => {
    return {
        ...item,
    };
};
