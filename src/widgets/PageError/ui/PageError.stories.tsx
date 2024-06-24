import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
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

export const Dark: Story = {
    args: {},
    decorators: [

        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
};

export const Orange: Story = {
    args: {},
    decorators: [

        ThemeDecorator(Theme.ORANGE),
        StoreDecorator({
            scroll: { scrollSave: {} },
        }),
    ],
};
