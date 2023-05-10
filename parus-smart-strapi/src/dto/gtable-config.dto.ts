import { parseNumber } from '@src/utils/parse-number.util';
import { ECounterType } from '../enums/counter-type.enum';
import { ETariffType } from '../enums/tarif-type.enum';

export interface IGTableConfigDto {
    id: string;
    currentValueColumn: string;
    name: string;
    range: string;
    spreadSheetID: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    counterType: ECounterType;
    tariffType: ETariffType;
    houseName: string;
    year: number;
}

export const createGTableConfigDto = (item: any): IGTableConfigDto => {
    return {
        id: item.id,
        ...item.attributes,
        year: parseNumber(item.attributes.year || 0),
    };
};
