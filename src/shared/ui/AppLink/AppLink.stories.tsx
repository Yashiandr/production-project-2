import type { Meta, StoryObj } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
        children: 'App Link',
    },
    render(args) {
        return <div style={{ backgroundColor: 'var(--inverted-bg-color)' }}><AppLink {...args} /></div>;
    },
    tags: ['autodocs'],

} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
export const Secondary: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
    },
};
