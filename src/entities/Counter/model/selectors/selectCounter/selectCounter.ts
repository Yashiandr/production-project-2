import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useSelectCounter, selectCounter] = buildSelector((state: StateSchema) => state.counter);
