import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Dropdown, DropdownItem } from './Dropdown';

const items: DropdownItem[] = [
    {
        content: 'first',
    },
    {
        content: 'second',
    },
    {
        content: 'third',
    },
    {
        content: 'four',
    },
];

const itemsWithLinks: DropdownItem[] = [
    {
        content: 'first link',
        href: '#',
    },
    {
        content: 'second link',
        href: '#',
    },
    {
        content: 'third link',
        href: '#',
    },
    {
        content: 'something',
    },
];

const itemsWithDisabled: DropdownItem[] = [
    {
        content: 'first link',
        href: '#',
    },
    {
        content: 'second link',
        href: '#',
        disabled: true,
    },
    {
        content: 'third link',
        href: '#',
    },
    {
        content: 'something',
        disabled: true,
    },
];

const meta = {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    args: {
        trigger: <Button>Trigger</Button>,
        items,
    },
    render: function Component(args) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Dropdown {...args} />
            </div>
        );
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

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

export const withLink: Story = {
    args: {
        items: itemsWithLinks,
    },
};

export const disabledItems: Story = {
    args: {
        items: itemsWithDisabled,
    },
};
