import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { PageError } from './PageError';

const meta = {
    title: 'widgets/PageError',
    component: PageError,

    tags: ['autodocs'],

} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
};
