import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

const meta = {
    title: 'shared/Input',
    component: Input,

    tags: ['autodocs'],

} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: 'Текст',
    },
};

export const Dark: Story = {
    ...Primary,
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const WithPlaceholder = {
    args: {
        ...Primary.args,
        placeholder: 'Placeholder',
    },
};

export const autofocused = {
    args: {
        ...Primary.args,
        autofocus: true,
    },
};
