import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginPassword } from './selectLoginPassword';

describe('selectLoginPassword.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                password: '123',
            },
        };
        expect(selectLoginPassword(state as StateSchema)).toBe('123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(selectLoginPassword(state as StateSchema)).toBe('');
    });
});
