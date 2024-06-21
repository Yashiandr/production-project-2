import { EntityId, EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article, EntityId> {
    isLoading?: boolean;
    error?: string;
    view?: ArticlesView;
    page: number;
    limit?: number;
    hasMore: boolean;
}
