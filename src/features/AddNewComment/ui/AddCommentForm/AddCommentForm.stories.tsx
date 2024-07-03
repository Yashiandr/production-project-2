import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AddCommentForm from './AddCommentForm';

const meta = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    args: {
        onSendComment: fn(),
    },

    tags: ['autodocs'],

} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        StoreDecorator({}),
    ],
};
