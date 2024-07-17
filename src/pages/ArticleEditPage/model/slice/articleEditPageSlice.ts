import { PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { ArticleEditPageSchema } from '../types/articleEditPageSchema';
import { ArticleBlock, ArticleBlockType, Article, ArticleType } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { addArticle } from '../services/addArticle';

const blocksAdapter = createEntityAdapter({
    selectId: (block: ArticleBlock) => block.id,
});

export const getArticleBlocks = blocksAdapter.getSelectors<Partial<StateSchema>>(
    (state) =>
        state.articleEditPage?.data?.blocks || blocksAdapter.getInitialState(),
);

const initialData = {

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
        },
    }),
};

const initialState: ArticleEditPageSchema = {
    data: initialData,
    isLoading: false,
    error: '',
    editData: undefined,
};

const articleEditPageSlice = buildSlice({
    name: 'articleEditPage',
    initialState,
    reducers: {
        setArticle: (state, action: PayloadAction<Article>) => {
            const article = action.payload;
            state.editData = action.payload;
            state.data = {
                ...article,
                blocks: {
                    ids: [],
                    entities: {},
                },
            };
            if (article.blocks) {
                blocksAdapter.setAll(state.data.blocks, article.blocks);
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.data.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.data.subtitle = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.data.img = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.data.type?.push(action.payload);
        },
        removeType: (state, action: PayloadAction<ArticleType>) => {
            console.log(action.payload);
            state.data.type = state.data.type?.filter((type) => type !== action.payload);
        },
        blockAdded:
            (state, action: PayloadAction<ArticleBlock>) => {
                blocksAdapter.addOne(state.data.blocks, action.payload);
            },
        blockUpdate:
            (state, { payload }: PayloadAction<ArticleBlock>) => {
                const { id } = payload;
                blocksAdapter.updateOne(state.data.blocks, { id, changes: { ...payload } });
            },
        blockInsert:
            (state, { payload }: PayloadAction<ArticleBlock>) => {
                const { id } = payload;
                const blocksToMove = getArticleBlocks.selectAll({ articleEditPage: state }).slice(Number(id) - 1);
                const movedBlocks = [] as ArticleBlock[];
                blocksToMove.forEach(
                    (block) => {
                        movedBlocks.push({ ...block, id: String(Number(block.id) + 1) });
                    },
                );
                blocksAdapter.setMany(state.data.blocks, movedBlocks);
                blocksAdapter.setOne(state.data.blocks, payload);
            },
        blockRemove:
            (state, action: PayloadAction<string>) => {
                blocksAdapter.removeOne(state.data.blocks, action.payload);
            },
        cancelEdit: (state) => {
            if (state.editData) {
                state.data = {
                    ...state.editData,
                    blocks: {
                        ids: [],
                        entities: {},
                    },
                };
                if (state.editData.blocks) {
                    blocksAdapter.setAll(state.data.blocks, state.editData.blocks);
                }
            } else {
                state.data = initialData;
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(addArticle.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(addArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});
export const {
    reducer: articleEditPageReducer,
    useActions: useArticleEditPageActions,
} = articleEditPageSlice;
