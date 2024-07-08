import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs } from './Tabs';

const meta = {
    title: 'shared/Tabs',
    component: Tabs,

    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: 'tab 1',
        tabs: [
            {
                value: 'tab 1',
                content: 'tab 1',
            },
            {
                value: 'tab 2',
                content: 'tab 2',
            },
            {
                value: 'tab 3',
                content: 'tab 3',
            },
        ],
        onTabClick: fn(),
    },
};
