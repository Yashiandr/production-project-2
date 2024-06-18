import { EntityId, EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

export interface ArticleDetailsCommentSchema extends EntityState<Comment, EntityId> {
    isLoading: boolean;
    error?: string;
}
