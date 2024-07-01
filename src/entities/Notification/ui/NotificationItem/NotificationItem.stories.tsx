import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationItem } from './NotificationItem';

const meta = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    args: {
        item: {
            id: '1',
            title: 'title',
            description: 'description',
        },
    },
    decorators: [
        StoreDecorator({}),
    ],
    tags: ['autodocs'],

} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
