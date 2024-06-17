import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from '../../config/storybook/ThemeDecorator/ThemeDecorator';
import {
    Text, TextAlign, TextSize, TextTheme,
} from './Text';

const meta = {
    title: 'shared/Text',
    component: Text,

    tags: ['autodocs'],

} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'Title lorem ipsum',
        text: 'Description Description Description Description',
    },
};

export const TitleOnly: Story = {
    args: {
        title: Primary!.args!.title,
    },
};

export const TextOnly: Story = {
    args: {
        text: Primary!.args!.text,
    },
};

export const PrimaryDark: Story = {
    args: {
        title: 'Title lorem ipsum',
        text: 'Description Description Description Description',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const PrimaryOrange: Story = {
    args: {
        title: 'Title lorem ipsum',
        text: 'Description Description Description Description',
    },
    decorators: [
        ThemeDecorator(Theme.ORANGE),
    ],
};

export const Error: Story = {
    args: {
        title: 'Error message',
        text: 'Error Error Error Error Error',
        theme: TextTheme.ERROR,
    },
};

export const ErrorDark: Story = {
    ...Error,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const ErrorOrange: Story = {
    ...Error,
    decorators: [
        ThemeDecorator(Theme.ORANGE),
    ],
};

export const AlignCenter: Story = {
    args: {
        ...Primary.args,
        align: TextAlign.CENTER,
    },
};

export const AlignRight: Story = {
    args: {
        ...Primary.args,
        align: TextAlign.RIGHT,
    },
};

export const SizeL: Story = {
    args: {
        ...Primary.args,
        size: TextSize.L,
    },
};

export const SizeXL: Story = {
    args: {
        ...Primary.args,
        size: TextSize.XL,
    },
};
