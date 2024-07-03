import { StateSchema } from '@/app/providers/StoreProvider';
import { selectCounter } from './selectCounter';

describe('selectCounter', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(selectCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
