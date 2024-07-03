import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entities/Article';

export const selectArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort || ArticleSortField.TITLE;
