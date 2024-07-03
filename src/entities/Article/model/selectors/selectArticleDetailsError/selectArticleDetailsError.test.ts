import { StateSchema } from '@/app/providers/StoreProvider';
import { selectArticleDetailsError } from './selectArticleDetailsError';

describe('selectArticleDetailsData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(selectArticleDetailsError(state as StateSchema)).toBe('error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {},
        };
        expect(selectArticleDetailsError(state as StateSchema)).toBeUndefined();
    });
});
