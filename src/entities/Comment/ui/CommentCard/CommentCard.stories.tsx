import type { Meta, StoryObj } from '@storybook/react';
import defaultWomanAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
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
    tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryRedesigned: Story = {
    decorators: [FeaturesFlagsDecorator({ isAppRedesign: true })],
};

export const isLoading: Story = {
    args: {
        isLoading: true,
    },
};
