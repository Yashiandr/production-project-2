import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited || false;
