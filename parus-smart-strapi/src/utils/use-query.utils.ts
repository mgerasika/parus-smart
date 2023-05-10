import axios from 'axios';

export interface IQueryResult<T> {
    data?: T;
    error?: any;
}
export async function useQueryAsync<T = any>({ url }: { url: string }): Promise<IQueryResult<T>> {
    try {
        const { data } = await axios.get(url);
        return { data };
    } catch (error) {
        return { error };
    }
}
