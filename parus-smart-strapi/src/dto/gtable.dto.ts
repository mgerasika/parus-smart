import { ECounterType } from '../enums/counter-type.enum';
import { EGTableColumn } from '../enums/gtable-column.enum';
import { ETariffType } from '../enums/tarif-type.enum';
import { parseNumber } from '../utils/parse-number.util';
import { IGTableConfigDto } from './gtable-config.dto';

export interface IGTableDto {
    flatId: string;
    ownerFullName: string;
    flatSpace: number;
    personalNumber: string;
    counterNumber: string;
    previousValue: number;
    currentValue: number;
    excelRowNumber: number;
    counterType: ECounterType;
    tariffType: ETariffType;
    houseName: string;
    year: number;
    spreadSheetID: string;
}

interface IProps {
    item: any;
    rowIndex: number;
    config: IGTableConfigDto;
    prevValueColumnIndex: number;
    currentValueColumnIndex: number;
}
export const createGTableDto = ({
    item,
    rowIndex,
    config,
    prevValueColumnIndex,
    currentValueColumnIndex,
}: IProps): IGTableDto => {
    const res: IGTableDto = {
        flatId: item[EGTableColumn.flatId_a],
        ownerFullName: item[EGTableColumn.ownerFullName_b],
        flatSpace: parseNumber(item[EGTableColumn.flatSpace_c]),
        personalNumber: parseNumber(item[EGTableColumn.personalNumber_d]).toString(),
        counterNumber: item[EGTableColumn.counterNumber_e],
        previousValue: parseNumber(item[prevValueColumnIndex]),
        currentValue: parseNumber(item[currentValueColumnIndex]),
        excelRowNumber: rowIndex,
        counterType: config.counterType,
        tariffType: config.tariffType,
        houseName: config.houseName,
        year: config.year,
        spreadSheetID: config.spreadSheetID,
    };
    if (!res.flatId || !res.ownerFullName || !res.personalNumber || !res.counterNumber) {
        // throw "Validation error " + JSON.stringify(res);
    }
    return res;
};
