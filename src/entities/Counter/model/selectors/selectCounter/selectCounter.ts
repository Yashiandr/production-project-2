import { StateSchema } from '@/app/providers/StoreProvider';

export const selectCounter = (state: StateSchema) => state.counter;
