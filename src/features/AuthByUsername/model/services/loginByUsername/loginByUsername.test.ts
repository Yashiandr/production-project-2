import { expect } from '@storybook/test';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from '../../../../../entities/User';
import { loginByUsername } from './loginByUsername';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
    initReactI18next: {
        type: '3rdParty',
        init: (i18next: unknown) => i18next,
    },
}));

describe('loginByUsername.test', () => {
    test('success login', async () => {
        const userValue = { username: 'user', id: '1' };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({ username: 'user', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: 'user', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Вы ввели неверный логин или пароль');
    });
});
