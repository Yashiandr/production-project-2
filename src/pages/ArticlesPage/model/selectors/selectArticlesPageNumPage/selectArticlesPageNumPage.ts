import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlesPageNumPage = (state: StateSchema) => state.articlesPage?.page || 5;
