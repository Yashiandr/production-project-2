import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';

const meta = {
    title: 'shared/AppLinkRedesign',
    component: AppLink,
    args: {
        to: '/',
        children: 'App Link',
    },
    render(args) {
        return (
            <div style={{ backgroundColor: 'var(--inverted-bg-color)' }}>
                <AppLink {...args} />
            </div>
        );
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
