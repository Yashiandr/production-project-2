import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';

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

export const Disabled = {
    args: {
        ...Primary.args,
        disabled: true,
    },
};

export const Clear: Story = {
    args: {
        children: 'Clear',
        theme: ButtonTheme.CLEAR,
    },
};

export const ClearDark: Story = {
    ...Clear,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const ClearInverted: Story = {
    args: {
        children: 'ClearInv',
        theme: ButtonTheme.CLEAR_INVERTED,
    },
};

export const ClearInvertedDark: Story = {
    ...ClearInverted,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        theme: ButtonTheme.OUTLINE,
    },
};

export const OutlineDark: Story = {
    ...Outline,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const OutlineRed: Story = {
    args: {
        children: 'Outline Red',
        theme: ButtonTheme.OUTLINE_RED,
    },
};

export const OutlineGreen: Story = {
    args: {
        children: 'Outline Green',
        theme: ButtonTheme.OUTLINE_GREEN,
    },
};

export const Background: Story = {
    args: {
        children: 'Background',
        theme: ButtonTheme.BACKGROUND,
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
        theme: ButtonTheme.BACKGROUND_INVERTED,
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
        children: '∎',
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
