import type { Meta, StoryObj } from '@storybook/react';
import defaultAvatar from '../../assets/stockImage/default-woman-avatar.jpg';
import { Avatar } from './Avatar';

const meta = {
    title: 'shared/Avatar',
    component: Avatar,

    tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        size: 150,
        src: defaultAvatar,
        alt: 'Default Avatar',
    },
};

export const Small: Story = {
    args: {
        ...Primary?.args,
        size: 50,
    },
};
