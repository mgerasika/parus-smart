import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Number.MAX_VALUE,
            refetchOnMount: false,
            keepPreviousData: true,
        },
    },
});
