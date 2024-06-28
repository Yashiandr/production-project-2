import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import ForbiddenPage from './ForbiddenPage';

const meta = {
    title: 'pages/ForbiddenPage',
    component: ForbiddenPage,
    decorators: [
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],

    tags: ['autodocs'],

} satisfies Meta<typeof ForbiddenPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
