import dayjs from 'dayjs';
import { ECounterType } from '../enums/counter-type.enum';
import { ETariffType } from '../enums/tarif-type.enum';
import { IGTableDto } from './gtable.dto';

export interface IGTableValueDto {
    date: number;
    value: number;
    counterType: ECounterType;
    tariffType: ETariffType;
    personalNumber: string;
}

interface IProps {
    gtable: IGTableDto;
}
export const createGTableValues = ({ gtable }: IProps): IGTableValueDto[] => {
    const res: IGTableValueDto = {
        counterType: gtable.counterType,
        personalNumber: gtable.personalNumber,
        tariffType: gtable.tariffType,
        value: gtable.currentValue,
        date: dayjs().set('year', gtable.year).set('month', 7).set('date', 28).unix(),
    };

    return [res];
};
