import { PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { ArticleEditPageSchema } from '../types/articleEditPageSchema';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleBlock, ArticleBlockType } from '@/entities/Article';

const blocksAdapter = createEntityAdapter({
    selectId: (block: ArticleBlock) => block.id,
});

export const getArticleBlocks = blocksAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleEditPage?.data.blocks || blocksAdapter.getInitialState(),
);

const initialState: ArticleEditPageSchema = {
    data: {
        title: '',
        subtitle: '',
        type: [],
        createdAt: '',
        Loading: false,
        views: 0,
        img: '',
        blocks: blocksAdapter.getInitialState({
            ids: ['1'],
            entities: {
                1: {
                    id: '1',
                    title: '',
                    type: ArticleBlockType.TEXT,
                    paragraphs: [],
                },
            } }),
    },
    isLoading: false,
    error: '',
};

const articleEditPageSlice = buildSlice({
    name: 'articleEditPage',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.data.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.data.subtitle = action.payload;
        },
        blockAdded: (state, action: PayloadAction<ArticleBlock>) => {
            blocksAdapter.addOne(state.data.blocks, action.payload);
        },
        blockUpdate: (state, { payload }: PayloadAction<ArticleBlock>) => {
            const { id } = payload;
            blocksAdapter.updateOne(state.data.blocks, { id, changes: { ...payload } });
        },
    },
});

export const {
    reducer: articleEditPageReducer,
    useActions: useArticleEditPageActions,
} = articleEditPageSlice;
