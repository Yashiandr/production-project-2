import type { Meta, StoryObj } from '@storybook/react';
import {
    ArticleSortField,
    ArticlesView,
    ArticleType,
} from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticlesPageFilter } from './ArticlesPageFilter';

const meta = {
    title: 'pages/Article/ArticlesPageFilter',
    component: ArticlesPageFilter,
    decorators: [
        StoreDecorator({
            articlesPage: {
                search: '',
                type: ArticleType.IT,
                order: 'asc',
                sort: ArticleSortField.TITLE,
                view: ArticlesView.SMALL,
            },
        }),
    ],

    tags: ['autodocs'],
} satisfies Meta<typeof ArticlesPageFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
