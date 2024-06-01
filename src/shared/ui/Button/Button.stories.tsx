import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ThemeButton } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,

    tags: ['autodocs'],

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Button',
    },
};

export const SizeL = {
    args: {
        ...Primary.args,
        size: ButtonSize.L,
    },
};

export const SizeXL = {
    args: {
        ...Primary.args,
        size: ButtonSize.XL,
    },
};

export const Clear: Story = {
    args: {
        children: 'Clear',
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
        children: 'Outline',
        theme: ThemeButton.OUTLINE,
    },
};

export const OutlineDark: Story = {
    ...Outline,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Background: Story = {
    args: {
        children: 'Background',
        theme: ThemeButton.BACKGROUND,
    },
};

export const BackgroundDark: Story = {
    ...Background,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const BackgroundInverted: Story = {
    args: {
        children: 'bgInverted',
        theme: ThemeButton.BACKGROUND,
    },
};

export const BackgroundInvertedDark: Story = {
    ...BackgroundInverted,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Square: Story = {
    args: {
        square: true,
        theme: ThemeButton.BACKGROUND_INVERTED,
        children: '[]',
    },
};

export const SquareDark: Story = {
    ...Square,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const SquareSizeL: Story = {
    args: {
        ...Square.args,
        size: ButtonSize.L,
    },
};

export const SquareSizeXL: Story = {
    args: {
        ...Square.args,
        size: ButtonSize.XL,
    },
};
