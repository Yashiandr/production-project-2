import type { Meta, StoryObj } from '@storybook/react';
import defaultManAvatar from '@/shared/assets/stockImage/default-man-avatar.jpg';
import defaultWomanAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsComments } from './ArticleDetailsComments';

const comments = {
    ids: ['1', '2', '3'],
    entities: {
        1: {
            id: '1',
            text: 'Test comment 1',
            user: {
                id: '1',
                username: 'default user 1',
                avatar: defaultWomanAvatar,
                role: 'USER',
            },
        },
        2: {
            id: '2',
            text: 'Test comment 2',
            user: {
                id: '2',
                username: 'default user 2',
                avatar: defaultManAvatar,
                role: 'USER',
            },
        },
        3: {
            id: '3',
            text: 'Test comment 3',
            user: {
                id: '1',
                username: 'default user 1',
                avatar: defaultWomanAvatar,
                role: 'USER',
            },
        },
    },
};
const meta = {
    title: 'pages/Article/ArticleDetailsComments',
    component: ArticleDetailsComments,
    args: {
        id: '1',
    },
    decorators: [
        StoreDecorator({
            articleDetailsComments: comments,
        }),
    ],

    tags: ['autodocs'],
} satisfies Meta<typeof ArticleDetailsComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
