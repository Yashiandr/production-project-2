import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    args: {
        onSuccess: () => {
        },
    },

    tags: ['autodocs'],

} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            login: {
                username: '123',
                password: '123',
                isLoading: false,
            },
        }),
    ],
};

export const WithError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            login: {
                username: '123',
                password: '123',
                error: 'ERROR',
                isLoading: false,
            },
        }),
    ],
};

export const Loading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            login: {
                isLoading: true,
            },
        }),
    ],
};
