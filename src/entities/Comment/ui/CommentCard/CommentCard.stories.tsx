import type { Meta, StoryObj } from '@storybook/react';
import defaultWomanAvatar from 'shared/assets/stockImage/default-woman-avatar.jpg';
import { CommentCard } from './CommentCard';

const meta = {
    title: 'entities/CommentCard',
    component: CommentCard,

    tags: ['autodocs'],

} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comment: {
            id: '1',
            text: 'text comment',
            user: {
                id: '1',
                username: 'default user',
                avatar: defaultWomanAvatar,
            },
        },
    },
};

export const isLoading: Story = {
    args: {
        isLoading: true,
    },
};
