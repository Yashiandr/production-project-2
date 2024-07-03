import { StateSchema } from '@/app/providers/StoreProvider';
import { selectProfileError } from './selectProfileError';

describe('selectProfileError.test', () => {
    test('should return error', () => {
        const error = 'error';

        const state: DeepPartial<StateSchema> = {
            profile: {
                error,
            },
        };
        expect(selectProfileError(state as StateSchema)).toBe(error);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileError(state as StateSchema)).toBe('');
    });
});
