import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticlesPageLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 5;
