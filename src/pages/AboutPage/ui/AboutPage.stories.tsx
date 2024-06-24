import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import AboutPage from './AboutPage';

const meta = {
    title: 'pages/AboutPage',
    component: AboutPage,

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            scroll: {
                scrollSave: {},
            },
        }),
    ],

} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
