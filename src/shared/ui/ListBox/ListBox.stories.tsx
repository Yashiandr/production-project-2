import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ListBox, ListBoxItem } from './ListBox';

const items: ListBoxItem[] = [
    { value: 'Item 1', content: 'Item 1' },
    { value: 'Item 2', content: 'Item 2' },
    { value: 'Item 3', content: 'Item 3' },
    { value: 'Item 4', content: 'Item 4' },
    { value: 'disabled', content: 'disabled', disabled: true },
    { value: 'Item 6', content: 'Item 6' },

];

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    args: {
        items,
        onChange: fn(),
        defaultValue: 'default value',
    },
    render: function Component(args) {
        const [, setArgs] = useArgs();
        const onChange = (value: string) => {
            args.onChange(value);
            setArgs({ value });
        };
        return (
            <div
                style={{
                    width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <ListBox {...args} onChange={onChange} />
            </div>
        );
    },

    tags: ['autodocs'],

} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
export const withLabel: Story = {
    args: {
        label: 'label',
    },
};
export const topDirection: Story = {
    args: {
        direction: 'top',
    },
};

export const disabled: Story = {
    args: {
        label: 'with props "readonly"',
        readonly: true,
    },
};
