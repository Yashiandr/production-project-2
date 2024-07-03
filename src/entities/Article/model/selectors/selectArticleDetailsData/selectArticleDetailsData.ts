import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticleDetailsData = (state: StateSchema) => state.articleDetails?.data || undefined;
