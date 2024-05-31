import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ThemeButton } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,

    tags: ['autodocs'],

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'text',
    },
};

export const Clear: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.CLEAR,
    },
};

export const ClearDark: Story = {
    ...Clear,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Outline: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
    },
};
export const OutlineDark: Story = {
    ...Outline,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
