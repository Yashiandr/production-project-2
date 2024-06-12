import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/global';
import { selectLogin } from './selectLogin';

describe('selectLogin.test', () => {
    test('should return ', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: 'user',
                password: '123',
                isLoading: false,
                error: '',
            },
        };
        expect(selectLogin(state as StateSchema))
            .toEqual(
                {
                    username: 'user',
                    password: '123',
                    isLoading: false,
                    error: '',
                },
            );
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(selectLogin(state as StateSchema)).toEqual({});
    });
});
