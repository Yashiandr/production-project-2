import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from '../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextAlign, TextTheme } from './Text';

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

export const TitleOnlyDark: Story = {
    ...PrimaryDark,
    args: {
        title: Primary!.args!.title,
    },
};

export const TextOnlyDark: Story = {
    ...PrimaryDark,
    args: {
        text: Primary!.args!.text,
    },
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
