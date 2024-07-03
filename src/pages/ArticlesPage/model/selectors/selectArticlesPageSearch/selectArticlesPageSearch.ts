import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
