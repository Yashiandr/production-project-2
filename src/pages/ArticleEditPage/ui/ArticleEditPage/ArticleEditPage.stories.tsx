import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleEditPage from './ArticleEditPage';

const meta = {
    title: 'TODO/ArticleEditPage',
    component: ArticleEditPage,

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
} satisfies Meta<typeof ArticleEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
