import { StateSchema } from '@/app/providers/StoreProvider';

export const selectLoginIsLoading = (state: StateSchema) =>
    state?.login?.isLoading || false;
