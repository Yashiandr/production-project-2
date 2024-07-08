import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticlesPageOrder = (state: StateSchema) =>
    state.articlesPage?.order || 'asc';
