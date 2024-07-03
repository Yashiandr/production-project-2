import {
    EntityId,
    EntityState,
} from '@reduxjs/toolkit';
import {
    Article,
    ArticleSortField,
    ArticlesView,
    ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlesPageSchema extends EntityState<Article, EntityId> {
    isLoading?: boolean;
    error?: string;
    view?: ArticlesView;
    page: number;
    limit?: number;
    hasMore: boolean;
    order: SortOrder;
    sort?: ArticleSortField;
    search: string;
    _inited: boolean;
    type?: ArticleType;
}
