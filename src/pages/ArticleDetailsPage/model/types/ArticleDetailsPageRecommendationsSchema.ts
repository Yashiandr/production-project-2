import { EntityId, EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

export interface ArticleDetailsPageRecommendationsSchema
    extends EntityState<Article, EntityId> {
    isLoading: boolean;
    error?: string;
}
