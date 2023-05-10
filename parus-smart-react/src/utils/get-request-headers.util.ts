import { AxiosRequestHeaders } from 'axios';

export const getRequestHeaders = (): AxiosRequestHeaders => {
    return {
        // Authorization: `Bearer ${localStorage.getItem('auth2')}`,
    };
};
