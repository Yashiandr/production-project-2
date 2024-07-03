import { StateSchema } from '@/app/providers/StoreProvider';

export const selectLoginError = (state: StateSchema) => state?.login?.error || '';
