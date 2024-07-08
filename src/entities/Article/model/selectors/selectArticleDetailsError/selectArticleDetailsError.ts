import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useSelectArticleDetailsError, selectArticleDetailsError] =
    buildSelector(
        (state: StateSchema) => state.articleDetails?.error || undefined,
    );
