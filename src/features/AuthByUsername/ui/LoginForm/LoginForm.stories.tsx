import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,

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

export const Dark: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            login: {
                username: '123',
                password: '123',
                isLoading: false,
            },
        }),
        ThemeDecorator(Theme.DARK),
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

export const WithErrorDark: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            login: {
                username: '123',
                password: '123',
                isLoading: false,
                error: 'ERROR',
            },
        }),
        ThemeDecorator(Theme.DARK),
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
