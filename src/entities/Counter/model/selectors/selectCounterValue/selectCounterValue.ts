import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useSelectCounterValue, selectCounterValue] = buildSelector((state: StateSchema) => state.counter.value || 0);
