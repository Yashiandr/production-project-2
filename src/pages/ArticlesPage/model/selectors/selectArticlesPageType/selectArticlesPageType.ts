import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

export const selectArticlesPageType = (state: StateSchema) =>
    state.articlesPage?.type || ArticleType.ALL;
