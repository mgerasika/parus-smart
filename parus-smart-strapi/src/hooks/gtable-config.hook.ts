import { IGTableConfigDto } from '../dto/gtable-config.dto';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetGTableConfigAsync = async (): Promise<IApiResult<IGTableConfigDto[]>> => {
    try {
        const res: any = await (strapi as any).service('api::g-table-config.g-table-config').find({});
        return { data: res.results };
    } catch (error) {
        return { error };
    }
};

const useGetGTableConfigByIdAsync = async (id: string): Promise<IApiResult<IGTableConfigDto>> => {
    try {
        const res: any = await (strapi as any).service('api::g-table-config.g-table-config').findOne(id, { id });
        return { data: res };
    } catch (error) {
        return { error };
    }
};

export const gtableConfig = {
    useGetGTableConfigAsync,
    useGetGTableConfigByIdAsync,
};
