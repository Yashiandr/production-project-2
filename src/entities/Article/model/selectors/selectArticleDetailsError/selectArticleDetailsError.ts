import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticleDetailsError = (state: StateSchema) => state.articleDetails?.error || undefined;
