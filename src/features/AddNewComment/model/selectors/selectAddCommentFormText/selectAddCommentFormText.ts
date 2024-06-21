import { StateSchema } from 'app/providers/StoreProvider';

export const selectAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
