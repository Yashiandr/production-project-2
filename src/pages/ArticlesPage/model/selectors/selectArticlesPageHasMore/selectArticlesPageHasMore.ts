import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
