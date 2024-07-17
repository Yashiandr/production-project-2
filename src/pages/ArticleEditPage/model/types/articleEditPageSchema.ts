import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleBlock } from '@/entities/Article';

type ArticleForEditing = Omit<Article, 'id' | 'blocks'>

export interface ArticleCreating extends ArticleForEditing {
    blocks: EntityState<ArticleBlock, string>,
}

export interface ArticleEditPageSchema {
    isLoading?: boolean;
    error?: string;
    data: ArticleCreating;
    editData: Article | undefined;
}
