import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/global';
import { selectLoginUsername } from './selectLoginUsername';

describe('selectLoginUsername.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: 'user',
            },
        };
        expect(selectLoginUsername(state as StateSchema)).toBe('user');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(selectLoginUsername(state as StateSchema)).toBe('');
    });
});
