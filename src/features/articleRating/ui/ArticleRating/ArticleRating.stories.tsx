import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const rating = [{
    id: '1', rate: 4, feedback: 'Хорошая статья', userId: '1', articleId: '1',
}];

const meta = {
    title: 'features/Article/ArticleRating',
    component: ArticleRating,
    decorators: [
        StoreDecorator({ user: { authData: { id: '1' } } }),
    ],
    parameters: {
        loki: { skip: true },
        ockData: [
            {
                url: `${__API__}/article-ratings?userId=1&articleId=1`,
                method: 'GET',
                status: 200,
                response: rating,
            },
        ],
    },

} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        articleId: '1',
    },
};

export const WithoutRating: Story = {
    args: {
        articleId: '2',
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/article-ratings?userId=1&articleId=2`,
                method: 'GET',
                status: 200,
                response: undefined,
            },
        ],
    },
};
