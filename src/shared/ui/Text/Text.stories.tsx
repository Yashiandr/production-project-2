import type { Meta, StoryObj } from '@storybook/react';
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

export const Error: Story = {
    args: {
        title: 'Error message',
        text: 'Error Error Error Error Error',
        theme: TextTheme.ERROR,
    },
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

export const SizeS: Story = {
    args: {
        ...Primary.args,
        size: TextSize.S,
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
