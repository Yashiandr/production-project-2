import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ArticlesViewSelector } from './ArticlesViewSelector';
import { ArticlesView } from '@/entities/Article';

const meta = {
    title: 'entities/Article/ArticlesViewSelector',
    component: ArticlesViewSelector,

    tags: ['autodocs'],
} satisfies Meta<typeof ArticlesViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onViewClick: fn(),
        view: ArticlesView.SMALL,
    },
};
