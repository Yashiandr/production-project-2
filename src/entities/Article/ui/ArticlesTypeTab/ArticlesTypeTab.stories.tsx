import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ArticleType } from '../../model/types/article';
import { ArticlesTypeTab } from './ArticlesTypeTab';

const meta = {
    title: 'entities/Article/ArticlesTypeTab',
    component: ArticlesTypeTab,

    tags: ['autodocs'],

} satisfies Meta<typeof ArticlesTypeTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: ArticleType.IT,
        onChangeType: fn(),
    },
};
