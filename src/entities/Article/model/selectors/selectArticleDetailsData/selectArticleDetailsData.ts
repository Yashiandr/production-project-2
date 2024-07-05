import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useSelectArticleDetailsData, selectArticleDetailsData] = buildSelector(
    (state: StateSchema) => state.articleDetails?.data || undefined,
);
