import { createArticleDto, IArticleDto } from '../dto/article.dto';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetArticlesAsync = async (): Promise<IApiResult<IArticleDto[]>> => {
    const res: any = await (strapi as any).service('api::article.article').find({});
    return { data: res.results.map((i: any) => createArticleDto(i)) };
};

const useGetArticleByIdAsync = async (id: string): Promise<IApiResult<IArticleDto>> => {
    const res: any = await (strapi as any).service('api::article.article').findOne(id, { id });
    return { data: createArticleDto(res) };
};

export const article = {
    useGetArticleByIdAsync,
    useGetArticlesAsync,
};
