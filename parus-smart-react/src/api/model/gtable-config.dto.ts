export interface IGTableConfigDto {
    id: string;
    CurrentValueColumn: string;
    Name: string;
    Range: string;
    SpreadSheetID: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createGTableConfigDto = (item: any): IGTableConfigDto => {
    return {
        id: item.id,
        ...item.attributes,
    };
};
