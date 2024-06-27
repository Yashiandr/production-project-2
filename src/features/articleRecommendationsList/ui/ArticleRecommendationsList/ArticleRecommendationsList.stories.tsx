import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta = {
    title: 'TODO/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    decorators: [
        StoreDecorator({}),
    ],
    parameters: {
        loki: {
            skip: true,
        },
    },

    tags: ['autodocs'],

} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
