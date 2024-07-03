import { StateSchema } from '@/app/providers/StoreProvider';

export const selectLoginUsername = (state: StateSchema) => state?.login?.username || '';
