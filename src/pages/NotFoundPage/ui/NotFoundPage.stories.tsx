import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotFoundPage } from './NotFoundPage';

const meta = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],

} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [
        PageDecorator,
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
};

export const Orange: Story = {
    args: {},
    decorators: [
        PageDecorator,
        ThemeDecorator(Theme.ORANGE),
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
};
