import type { Meta, StoryObj } from '@storybook/react';
import defaultManAvatar from '@/shared/assets/stockImage/default-man-avatar.jpg';
import defaultWomanAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';

import { CommentList } from './CommentList';

const comments = [
    {
        id: '1',
        text: 'Test comment 1',
        user: {
            id: '1',
            username: 'default user 1',
            avatar: defaultWomanAvatar,
            role: 'USER',
        },
    },
    {
        id: '2',
        text: 'Test comment 2',
        user: {
            id: '2',
            username: 'default user 2',
            avatar: defaultManAvatar,
            role: 'USER',
        },
    },
    {
        id: '3',
        text: 'Test comment 3',
        user: {
            id: '1',
            username: 'default user 1',
            avatar: defaultWomanAvatar,
            role: 'USER',
        },
    },
];

const meta = {
    title: 'entities/Comment/CommentList',
    component: CommentList,

    tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comments,
    },
};

export const isLoading: Story = {
    args: {
        comments,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {},
};
