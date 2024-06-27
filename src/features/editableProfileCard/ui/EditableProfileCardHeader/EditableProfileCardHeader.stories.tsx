import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';

const meta = {
    title: 'features/Profile/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    decorators: [
        StoreDecorator({}),
    ],

    tags: ['autodocs'],

} satisfies Meta<typeof EditableProfileCardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
