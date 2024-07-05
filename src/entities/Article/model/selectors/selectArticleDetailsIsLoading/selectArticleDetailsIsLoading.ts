import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useSelectArticleDetailsIsLoading, selectArticleDetailsIsLoading] = buildSelector(
    (state: StateSchema) => state.articleDetails?.isLoading || false,
);
