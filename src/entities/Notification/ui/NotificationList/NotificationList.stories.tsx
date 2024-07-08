import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Notification } from '../../model/types/notification';
import { NotificationList } from './NotificationList';

const notifications: Notification[] = [
    {
        id: '1',
        title: 'title 1',
        description: 'description 1',
    },
    {
        id: '2',
        title: 'title 2',
        description: 'description 2',
    },
    {
        id: '3',
        title: 'title 3',
        description: 'description 3',
        href: '#',
    },
    {
        id: '4',
        title: 'title 4',
        description: 'description 4',
    },
    {
        id: '5',
        title: 'title 5',
        description: 'description 5',
    },
];

const meta = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
            },
        ],
    },

    tags: ['autodocs'],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const IsLoading = {
    args: {},
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
                delay: 1000000,
            },
        ],
    },
};
