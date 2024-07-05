import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import { fn } from '@storybook/test';
import { ArticlesTypeTabs } from './ArticlesTypeTabs';
import { ArticleType } from '@/entities/Article';

const meta = {
    title: 'entities/Article/ArticlesTypeTab',
    component: ArticlesTypeTabs,

    tags: ['autodocs'],

} satisfies Meta<typeof ArticlesTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: ArticleType.IT,
        onChangeType: fn(),
    },
};
