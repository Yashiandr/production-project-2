import { StateSchema } from 'app/providers/StoreProvider';

export const selectAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error || undefined;
