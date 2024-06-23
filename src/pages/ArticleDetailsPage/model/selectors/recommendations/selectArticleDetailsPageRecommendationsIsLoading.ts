import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleDetailsPageRecommendationsIsLoading = (
    state: StateSchema,
) => state.articleDetailsRecommendations?.isLoading || false;
