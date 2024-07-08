import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticlesPageIsLoading = (state: StateSchema) =>
    state.articlesPage?.isLoading;
