import { StateSchema } from '@/app/providers/StoreProvider';
import { selectArticleDetailsIsLoading } from './selectArticleDetailsIsLoading';

describe('selectArticleDetailsData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(selectArticleDetailsIsLoading(state as StateSchema)).toBe(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {},
        };
        expect(selectArticleDetailsIsLoading(state as StateSchema)).toBe(false);
    });
});
