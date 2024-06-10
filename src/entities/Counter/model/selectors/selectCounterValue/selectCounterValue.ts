import { StateSchema } from 'app/providers/StoreProvider';

export const selectCounterValue = (state: StateSchema) => state.counter.value || 0;
