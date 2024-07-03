import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticlesView } from '@/entities/Article';

export const selectArticlePageView = (state: StateSchema) => state.articlesPage?.view || ArticlesView.BIG;
