import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginError } from './selectLoginError';

describe('selectLoginError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                error: 'error',
            },
        };
        expect(selectLoginError(state as StateSchema)).toBe('error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(selectLoginError(state as StateSchema)).toBe('');
    });
});
