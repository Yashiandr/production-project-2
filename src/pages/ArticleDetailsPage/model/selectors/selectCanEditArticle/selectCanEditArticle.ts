import { createSelector } from '@reduxjs/toolkit';
import { selectArticleDetailsData } from 'entities/Article';
import { selectUserAuthData } from 'entities/User';

export const selectCanEditArticle = createSelector(
    selectUserAuthData,
    selectArticleDetailsData,
    (userData, articleData) => userData?.id === articleData?.userId,
);
