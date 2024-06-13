import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginIsLoading } from './selectLoginIsLoading';

describe('selectLoginIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                isLoading: true,
            },
        };
        expect(selectLoginIsLoading(state as StateSchema)).toBe(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(selectLoginIsLoading(state as StateSchema)).toBe(false);
    });
});
