import axios from 'axios';
import qs from 'qs';
import { useQuery, UseQueryResult } from 'react-query';
import { createCollection, ICollection } from '../collection';
import { ENV } from '../env';
import { createPageDto, IPageDto } from '../model/page.dto';

//https://parus-smart.herokuapp.com/api/articles

//about filtering
//https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
// Page, News, FAQ

const useGatPages = (): UseQueryResult<ICollection<IPageDto>> => {
    const query = qs.stringify(
        {
            sort: 'date:desc',
        },
        {
            encodeValuesOnly: true,
        },
    );

    return useQuery<ICollection<IPageDto>>(`faq`, () =>
        axios.get(ENV.SERVER_URL + `api/pages?${query}`).then((r) => {
            const data = r.data.data.map((item: any) => createPageDto(item));
            return createCollection<IPageDto>(data);
        }),
    );
};

export const page = {
    useGatPages,
};
