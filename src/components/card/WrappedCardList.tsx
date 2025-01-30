'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CardList from './CardList';

const queryClient = new QueryClient();

const WrappedCardList = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CardList />
        </QueryClientProvider>
    );
};

export default WrappedCardList;
