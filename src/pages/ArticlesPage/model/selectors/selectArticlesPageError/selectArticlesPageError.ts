import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlesPageError = (state: StateSchema) => state.articlesPage?.error || '';
