import { StateSchema } from 'app/providers/StoreProvider';
import { selectProfileReadonly } from './selectProfileReadonly';

describe('selectProfileReadonly.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(selectProfileReadonly(state as StateSchema)).toBe(true);
    });
    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileReadonly(state as StateSchema)).toBe(false);
    });
});
