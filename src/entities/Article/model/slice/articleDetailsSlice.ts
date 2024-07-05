import { fetchArticleById } from '../services/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = buildSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: articleDetailsActions,
    reducer: articleDetailsReducer,
    useActions: useArticleDetailsActions,
} = articleDetailsSlice;
