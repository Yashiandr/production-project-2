import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleDetailsPageRecommendationsError = (
    state: StateSchema,
) => state.articleDetailsRecommendations?.error || '';
