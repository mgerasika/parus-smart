import axios from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { ENV } from '../env';

interface ILoginData {
    email: string;
    password: string;
}
const useLogin = (): UseMutationResult<any, unknown, ILoginData> => {
    return useMutation('login', (data: ILoginData) => {
        return axios
            .post(`${ENV.SERVER_URL}api/auth/local`, {
                identifier: data.email,
                password: data.password,
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('auth2', response.data.jwt);
                return response.data;
            });
    });
};

export const auth = {
    useLogin,
};
