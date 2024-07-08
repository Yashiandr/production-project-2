import type { Meta, StoryObj } from '@storybook/react';
import { User, UserRole } from '@/entities/User';
import defaultAdminAvatar from '@/shared/assets/stockImage/default-admin-avatar.jpg';
import defaultManAvatar from '@/shared/assets/stockImage/default-man-avatar.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AvatarDropdown } from './AvatarDropdown';

const user: User = {
    id: '1',
    username: 'user',
    avatar: defaultManAvatar,
    roles: [UserRole.USER],
};

const admin: User = {
    id: '2',
    username: 'admin',
    avatar: defaultAdminAvatar,
    roles: [UserRole.ADMIN],
};

const meta = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    args: {
        authData: user,
    },
    decorators: [StoreDecorator({})],
    render: function Component(args) {
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
                    <AvatarDropdown {...args} />
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
} satisfies Meta<typeof AvatarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Admin: Story = {
    args: {
        authData: admin,
    },
    decorators: [
        StoreDecorator({
            user: { authData: admin },
        }),
    ],
};
