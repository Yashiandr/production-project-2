import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading || false;
