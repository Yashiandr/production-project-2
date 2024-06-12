import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            profile: {
                readonly: true,
                isLoading: false,
            },
        }),
    ],

} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
