import { StateSchema } from '@/app/providers/StoreProvider';
import { selectProfileIsLoading } from './selectProfileIsLoading';

describe('selectProfileIsLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(selectProfileIsLoading(state as StateSchema)).toBe(true);
    });
    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileIsLoading(state as StateSchema)).toBe(false);
    });
});
