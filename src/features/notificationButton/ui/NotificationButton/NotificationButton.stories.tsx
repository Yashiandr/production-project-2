import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from 'entities/Notification/model/types/notification';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationButton } from './NotificationButton';

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
    title: 'features/NotificationButton',
    component: NotificationButton,
    decorators: [StoreDecorator({})],
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
    render: function Component() {
        return (
            <>
                <div
                    style={{
                        width: '50%',
                        height: '10vh',
                        margin: 'auto',
                        paddingRight: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        backgroundColor: 'var(--inverted-bg-color)',
                    }}
                >
                    <NotificationButton />

                </div>
                <div
                    style={{
                        minHeight: '90vh',
                        backgroundColor: 'var(--bg-color)',
                    }}
                />
            </>
        );
    },
    tags: ['autodocs'],

} satisfies Meta<typeof NotificationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
