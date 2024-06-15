import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

const meta = {
    title: 'shared/Modal',
    component: Modal,

    decorators: [
        PageDecorator,
    ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        storybook: true,
        children:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto culpa dolor expedita libero mollitia nihil perferendis porro quam veniam! Accusantium autem consequuntur cupiditate dolorem doloribus, iure laborum nemo, nulla odio officiis reiciendis sequi sint ut veritatis, voluptates! Ab corporis cum cumque dolore dolores dolorum eos harum id, ipsa labore laborum, minus nam natus nulla pariatur porro sed sequi sit tempora tenetur! Cumque eius magnam molestias optio quas? Aliquam, explicabo velit? Assumenda doloribus facilis illo iure minus nostrum quos sed! Cumque, excepturi illum inventore iure nemo neque nostrum obcaecati quaerat qui ut. Atque ea eos fugit nihil pariatur provident quia?'
        ,
    },
};

export const Dark: Story = {
    args: {
        ...Primary.args,
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Orange: Story = {
    args: {
        ...Primary.args,
    },
    decorators: [
        ThemeDecorator(Theme.ORANGE),
    ],
};
