import { ECounterType } from '../enums/counter-type.enum';
import { ETariffType } from '../enums/tarif-type.enum';

export interface IGTableDto {
    flatId: string;
    ownerFullName: string;
    flatSpace: number;
    personalNumber: number;
    counterNumber: number;
    previousValue: number;
    currentValue: number;
    excelRowIndex: number;
    counterType: ECounterType;
    tariffType: ETariffType;
    houseName: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createGTableDto = (item: any): IGTableDto => {
    return {
        ...item,
    };
};
