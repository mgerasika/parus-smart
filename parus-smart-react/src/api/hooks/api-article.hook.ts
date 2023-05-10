import axios from 'axios';
import qs from 'qs';
import { useQuery, UseQueryResult } from 'react-query';
import { createCollection, ICollection } from '../collection';
import { EPageType } from '../enum';
import { ENV } from '../env';
import { createArticleDto, IArticleDto } from '../model/article.dto';

//https://parus-smart.herokuapp.com/api/articles

//about filtering
//https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
// Page, News, FAQ

const useGetArticles = (): UseQueryResult<ICollection<IArticleDto>> => {
    const query = qs.stringify(
        {
            sort: 'date:desc',
        },
        {
            encodeValuesOnly: true,
        },
    );

    return useQuery<ICollection<IArticleDto>>(`articles-list`, () =>
        axios.get(ENV.SERVER_URL + `api/articles?${query}`).then((r) => {
            const data = r.data.data.map((item: any) => createArticleDto(item));
            return createCollection<IArticleDto>(data);
        }),
    );
};

const useGetArticleById = (id: EPageType | string): UseQueryResult<IArticleDto> => {
    return useQuery<IArticleDto>(`article-by-id-${id}`, () =>
        axios.get(ENV.SERVER_URL + `api/articles/${id}`).then((r) => {
            const data = createArticleDto(r.data.data);
            return data;
        }),
    );
};

export const article = {
    useGetArticles,
    useGetArticleById,
};
