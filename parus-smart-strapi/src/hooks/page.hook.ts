import { createPageDto, IPageDto } from '../dto/page.dto';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetPagesAsync = async (): Promise<IApiResult<IPageDto[]>> => {
    const res: any = await (strapi as any).service('api::page.page').find({});
    return { data: res.results.map((i: any) => createPageDto(i)) };
};

const useGetPageByIdAsync = async (id: string): Promise<IApiResult<IPageDto>> => {
    const res: any = await (strapi as any).service('api::page.page').findOne(id, { id });
    return { data: createPageDto(res) };
};

export const page = {
    useGetPagesAsync,
    useGetPageByIdAsync,
};
