import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
    title: 'shared/Select',
    component: Select,

    args: {
        options: [
            { value: '1', content: 'Первый Элемент' },
            { value: '2', content: 'Второй Элемент' },
            { value: '3', content: 'Третий элемент' },
        ],
    },

    tags: ['autodocs'],

} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Select',

    },
};

export const WithOutLabel: Story = {
    args: {},
};
