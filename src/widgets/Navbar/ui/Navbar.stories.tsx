import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import { Notification } from '@/entities/Notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';

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
    title: 'widgets/Navbar',
    component: Navbar,
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
                delay: 500,
            },
        ],
    },

    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            user: {
                authData: undefined,
            },
        }),
    ],

} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const WithAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: { authData: {} },
        }),
    ],
};
