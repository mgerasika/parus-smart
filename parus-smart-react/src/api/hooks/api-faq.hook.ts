import axios from 'axios';
import qs from 'qs';
import { useQuery, UseQueryResult } from 'react-query';
import { createCollection, ICollection } from '../collection';
import { EPageType } from '../enum';
import { ENV } from '../env';
import { createFaqDto, IFaqDto } from '../model/faq.dto';

//https://parus-smart.herokuapp.com/api/articles

//about filtering
//https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
// Page, News, FAQ

const useGetFaqList = (): UseQueryResult<ICollection<IFaqDto>> => {
    const query = qs.stringify(
        {
            sort: 'date:desc',
        },
        {
            encodeValuesOnly: true,
        },
    );

    return useQuery<ICollection<IFaqDto>>(`faq`, () =>
        axios.get(ENV.SERVER_URL + `api/faqs?${query}`).then((r) => {
            const data = r.data.data.map((item: any) => createFaqDto(item));
            return createCollection<IFaqDto>(data);
        }),
    );
};

const useGetFaqById = (id: EPageType | string): UseQueryResult<IFaqDto> => {
    return useQuery<IFaqDto>(`faq-by-id-${id}`, () =>
        axios.get(ENV.SERVER_URL + `api/faqs/${id}`).then((r) => {
            const data = createFaqDto(r.data.data);
            return data;
        }),
    );
};

export const faq = {
    useGetFaqList,
    useGetFaqById,
};
