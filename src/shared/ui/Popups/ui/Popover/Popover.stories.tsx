import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Popover } from './Popover';

const children = <div>Hello world</div>;
const trigger = <Button>Trigger</Button>;
const meta = {
    title: 'shared/Popups/Popover',
    component: Popover,
    args: {
        children,
        trigger,
    },
    render: function Component(args) {
        return (
            <div
                style={{
                    width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Popover {...args} />
            </div>
        );
    },

    tags: ['autodocs'],

} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const topDirection: Story = {
    args: {
        direction: 'top',
    },
};

export const topLeftDirection: Story = {
    args: {
        direction: 'top end',
    },
};

export const topRightDirection: Story = {
    args: {
        direction: 'top start',
    },
};

export const bottomLeftDirection: Story = {
    args: {
        direction: 'bottom end',
    },
};

export const bottomRightDirection: Story = {
    args: {
        direction: 'bottom start',
    },
};
