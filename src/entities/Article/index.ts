export { ArticleList } from './ui/ArticleList/ArticleList';

export {
    ArticleDetails,
} from './ui/ArticleDetails/ArticleDetails';

export { ArticlesViewSelector } from './ui/ArticlesViewSelector/ArticlesViewSelector';

export { selectArticleDetailsData } from './model/selectors/selectArticleDetailsData/selectArticleDetailsData';

export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice';

export type {
    Article,
} from './model/types/article';
export { ArticlesView } from './model/types/article';

export type {
    ArticleDetailsSchema,
} from './model/types/articleDetailsSchema';
