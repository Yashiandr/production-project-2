import { StateSchema } from 'app/providers/StoreProvider';

export const selectLogin = (state: StateSchema) => state.login;
