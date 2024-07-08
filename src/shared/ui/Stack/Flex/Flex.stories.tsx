import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
    title: 'shared/Flex',
    component: Flex,
    args: {
        children: (
            <>
                <div style={{ border: '.05rem dashed black' }}>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
            </>
        ),
    },

    tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RowPrimary: Story = {
    args: {},
};

export const RowGap4: Story = {
    args: {
        gap: '4',
    },
};

export const RowGap8: Story = {
    args: {
        gap: '8',
    },
};

export const RowGap16: Story = {
    args: {
        gap: '16',
    },
};

export const RowGap32: Story = {
    args: {
        gap: '32',
    },
};

export const RowJustifyStart: Story = {
    args: {
        justify: 'start',
    },
};

export const RowJustifyEnd: Story = {
    args: {
        justify: 'end',
    },
};

export const RowJustifyBetween: Story = {
    args: {
        justify: 'between',
    },
};

export const ColumnPrimary: Story = {
    args: {
        direction: 'column',
    },
};

export const ColumnGap4: Story = {
    args: {
        direction: 'column',
        gap: '4',
    },
};

export const ColumnGap8: Story = {
    args: {
        direction: 'column',
        gap: '8',
    },
};

export const ColumnGap16: Story = {
    args: {
        direction: 'column',
        gap: '16',
    },
};

export const ColumnGap32: Story = {
    args: {
        direction: 'column',
        gap: '32',
    },
};

export const ColumnAlignStart: Story = {
    args: {
        direction: 'column',
        align: 'start',
    },
};

export const ColumnAlignEnd: Story = {
    args: {
        direction: 'column',
        align: 'end',
    },
};

export const ColumnStretch: Story = {
    args: {
        direction: 'column',
        align: 'stretch',
    },
};
