import type { Meta, StoryObj } from '@storybook/react';
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