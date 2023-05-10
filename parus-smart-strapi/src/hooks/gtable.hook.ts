import { IGTableConfigDto } from '@src/dto/gtable-config.dto';
import { createGTableValues, IGTableValueDto } from '@src/dto/gtable-value.dto';
import { createGTableDto, IGTableDto } from '@src/dto/gtable.dto';
import { ECounterType } from '@src/enums/counter-type.enum';
import { EGTableMonth } from '@src/enums/gtable-month.enum';
import { IGoogleAuthInfo } from '@src/interfaces/google-auth-info.interface';
import { cacheService } from '@src/shared/cache.service';
import { googleApi } from '@src/shared/google-table.util';
import { getBackupFileContentAsync } from '@src/utils/get-backup-file-content.util';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetGTableValuesByPersonalNumberAsync = async ({
    personal_number,
}: {
    personal_number: string;
}): Promise<IApiResult<IGTableValueDto[]>> => {
    const allData = await getBackupFileContentAsync();
    const allTablesData: IGTableDto[] = JSON.parse(allData);
    const personalGTableData = allTablesData.filter((f) => f.personalNumber === personal_number);
    if (personalGTableData.length === 0) {
        return { error: 'Not found any data by personal_number' };
    }
    const datumValues = personalGTableData.map((gtable: IGTableDto) => createGTableValues({ gtable })).flat();
    console.log('datum values count ', datumValues.length);
    return { data: datumValues };
};

const useGetGTableByPersonalNumberAsync = async ({
    personal_number,
    counter_type,
}: {
    personal_number: string;
    counter_type: ECounterType;
}): Promise<IApiResult<IGTableDto>> => {
    const allData = await getBackupFileContentAsync();
    const allTablesData: IGTableDto[] = JSON.parse(allData);
    const personalGTableData = allTablesData.find(
        (f) => f.personalNumber === personal_number && counter_type === f.counterType,
    );
    if (!personalGTableData) {
        return { error: 'Not found any data by personal_number and counter_type' };
    }
    return { data: personalGTableData };
};

const useGetAllAsync = async ({
    gtableConfigs,
    auth,
}: {
    auth: IGoogleAuthInfo;
    gtableConfigs: IGTableConfigDto[];
}): Promise<IApiResult<IGTableDto[]>> => {
    return await Promise.all(
        gtableConfigs.map(async (config) => {
            return await useGetGTableAsync({ config, auth, tabName: 'Аркуш1', month: EGTableMonth.october });
        }),
    )
        .then((tmp: any) => {
            const total: [] = tmp.map((t: any) => t.data).flat();
            console.log('total ', total.length);
            cacheService.set(CACHE_KEY, { value: total });
            return { data: total };
        })
        .catch((error) => {
            return { error };
        });
};

const useEditValueAsync = async ({
    personalNumber,
    allGtableConfigs,
    gtableConfig,
    month,
    tabName,
    auth,
    value,
}: {
    personalNumber: string;
    auth: IGoogleAuthInfo;
    month: EGTableMonth;
    tabName: string;
    gtableConfig: IGTableConfigDto;
    allGtableConfigs: IGTableConfigDto[];
    value: string;
}): Promise<IApiResult<void>> => {
    const { data: cacheData, error: cacheError } = await useGetAllFromCacheAsync({
        auth,
        gtableConfigs: allGtableConfigs,
    });
    if (cacheError) {
        return { error: cacheError };
    }
    const currentCells: IGTableDto[] = (cacheData || []).filter(
        (i) => i.counterType === gtableConfig.counterType && i.personalNumber === personalNumber,
    );
    if (currentCells.length === 0) {
        return { error: 'cells by personal_number not found ' + personalNumber };
    }
    if (currentCells.length > 1) {
        return { error: 'found more than 1 cells by personal_number not found ' + personalNumber };
    }
    const excelRowIndex = currentCells[0].excelRowNumber;
    if (excelRowIndex <= 1) {
        return { error: 'wrong excel row index = (should be > 1)' + excelRowIndex };
    }
    if (currentCells[0].spreadSheetID !== gtableConfig?.spreadSheetID) {
        return { error: 'wrong spreadsheet id' + currentCells[0].spreadSheetID };
    }

    const { data, error } = await googleApi.writeValuesAsync({
        auth: auth as any,
        excelRowIndex,
        month,
        spreadsheetId: gtableConfig.spreadSheetID,
        columnName: gtableConfig.currentValueColumn,
        tabName,
        value,
    });
    return { data, error };
};

const CACHE_KEY = 'all-gtables';
const useGetAllFromCacheAsync = async ({
    gtableConfigs,
    auth,
}: {
    auth: IGoogleAuthInfo;
    gtableConfigs: IGTableConfigDto[];
}): Promise<IApiResult<IGTableDto[]>> => {
    const cache = cacheService.get(CACHE_KEY);

    if (cache) {
        return { data: cacheService.get(CACHE_KEY) };
    }
    const { data } = await useGetAllAsync({ auth, gtableConfigs });
    cacheService.set(CACHE_KEY, { value: data });
    return { data: data || [] };
};

const useGetGTableAsync = async ({
    tabName,
    month,
    config,
    auth,
}: {
    tabName: string;
    auth: IGoogleAuthInfo;
    month: EGTableMonth;
    config: IGTableConfigDto;
}): Promise<IApiResult<IGTableDto[]>> => {
    const { data, error } = await googleApi.getValuesAsync({
        auth,
        tabName,
        month,
        range: config.range,
        spreadsheetId: config.spreadSheetID,
    });

    console.log('data from excel ' + data.length);
    if (data) {
        const firstRow: string[] = data.shift();
        const currentValueColumnIndex = firstRow
            .map((m) => m.toLowerCase())
            .indexOf(config.currentValueColumn.toLowerCase());

        const prevValueColumnIndex = firstRow.map((m) => m.toLowerCase()).indexOf('j');

        const res = data.map((item: any, idx: number) =>
            createGTableDto({
                item,
                rowIndex: idx + 2,
                config,
                prevValueColumnIndex,
                currentValueColumnIndex,
            }),
        );
        return { data: res };
    } else {
        return { error };
    }
};

export const gtable = {
    useEditValueAsync,
    useGetGTableAsync,
    useGetAllAsync,
    useGetAllFromCacheAsync,
    useGetGTableByPersonalNumberAsync,
    useGetGTableValuesByPersonalNumberAsync,
};
