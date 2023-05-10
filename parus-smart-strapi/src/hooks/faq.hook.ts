import { createFaqDto, IFaqDto } from '../dto/faq.dto';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetFaqAsync = async (): Promise<IApiResult<IFaqDto[]>> => {
    const res: any = await (strapi as any).service('api::faq.faq').find({});
    return { data: res.results.map((i: any) => createFaqDto(i)) };
};

const useGetFaqByIdAsync = async (id: string): Promise<IApiResult<IFaqDto>> => {
    const res: any = await (strapi as any).service('api::faq.faq').findOne(id, { id });
    return { data: createFaqDto(res) };
};

export const faq = {
    useGetFaqAsync,
    useGetFaqByIdAsync,
};
