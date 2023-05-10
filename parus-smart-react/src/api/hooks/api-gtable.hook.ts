import { getRequestHeaders } from '@/utils/get-request-headers.util';
import axios from 'axios';
import qs from 'qs';
import { useMutation, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { createCollection, ICollection } from '../collection';
import { ENV } from '../env';
import { createGTableConfigDto, IGTableConfigDto } from '../model/gtable-config.dto';
import { createGTableDto, IGTableDto } from '../model/gtable.dto';

export interface IGetGTableListRequest {
    index: number;
    query: { tabName: string; month: string };
}
const useGetGTableList = (
    data: IGetGTableListRequest,
    queryOptions: UseQueryOptions<any, any, any>,
): UseQueryResult<ICollection<IGTableDto>> => {
    const queryStr = qs.stringify(data.query, {
        encodeValuesOnly: true,
    });

    return useQuery<ICollection<IGTableDto>>(
        [`gtable-list`, data],
        () => {
            return axios
                .get(ENV.SERVER_URL + `api/private/gtable/${data.index}?${queryStr}`, {
                    headers: getRequestHeaders(),
                })
                .then((r) => {
                    const data = r.data.data.map((item: any) => createGTableDto(item));
                    return createCollection<IGTableDto>(data);
                });
        },
        queryOptions,
    );
};
interface IUpdateValueRequest {
    index: number;
    body: {
        tabName: string;
        month: string;
        excelRowIndex: number;
        value: string;
    };
}
const useUpdateValue = (): UseMutationResult<any, unknown, IUpdateValueRequest> => {
    return useMutation('gtable-update', (data: IUpdateValueRequest) => {
        return axios
            .post(
                `${ENV.SERVER_URL}api/private/gtable/${data.index}/set_value`,
                {
                    ...data.body,
                },
                {
                    headers: getRequestHeaders(),
                },
            )
            .then((response) => {
                console.log(response);
                return response.data;
            });
    });
};

const useGetGTableConfigList = (): UseQueryResult<ICollection<IGTableConfigDto>> => {
    return useQuery<ICollection<IGTableConfigDto>>(`gtable-config-list`, () =>
        axios
            .get(ENV.SERVER_URL + `api/private/gtable_config`, {
                headers: getRequestHeaders(),
            })
            .then((r) => {
                const data = r.data.data.map((item: any) => createGTableConfigDto(item));
                return createCollection<IGTableConfigDto>(data);
            }),
    );
};

export const gtable = {
    useGetGTableList,
    useGetGTableConfigList,
    useUpdateValue,
};
