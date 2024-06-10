import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/global';
import { selectCounterValue } from './selectCounterValue';

describe('selectCounterValue', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(selectCounterValue(state as StateSchema)).toBe(10);
    });
});
