import { apiHooks } from '@/api/hooks';
import { Layout } from '@/components/layout.component';
import { Loading } from '@/components/loading.component';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Login(): JSX.Element {
    const { mutate, isLoading, error, isSuccess } = apiHooks.auth.useLogin();
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any): void => {
        console.log('submit', data);
        mutate({ email: data.email, password: data.password });
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('redirect to admin');
            router.push('/admin');
        }
    }, [isSuccess, router]);

    return (
        <Layout title="Логін">
            <Loading isLoading={isLoading}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && <div className="invalid-feedback d-block">{(error as any).message}</div>}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </Loading>
        </Layout>
    );
}
