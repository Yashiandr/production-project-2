import { StateSchema } from '@/app/providers/StoreProvider';

export const selectUserInited = (state: StateSchema) => state.user._inited || false;
