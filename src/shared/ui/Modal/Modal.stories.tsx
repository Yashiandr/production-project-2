import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback } from 'react';
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator';
import { Modal } from './Modal';

const meta = {
    title: 'shared/Modal',
    component: Modal,
    args: {
        isOpen: true,
    },
    parameters: {
        loki: {
            skip: true,
        },
    },

    decorators: [
        PageDecorator,
    ],
    render: function Component(args) {
        const [, setArgs] = useArgs();
        const onClose = useCallback(() => {
            setArgs({ isOpen: false });
        }, [setArgs]);

        const onOpen = useCallback(() => {
            setArgs({ isOpen: true });
        }, [setArgs]);

        return (
            <>
                <button
                    type="button"
                    style={{ position: 'absolute' }}
                    onClick={onOpen}
                >
                    open
                </button>
                <Modal onClose={onClose} {...args} />
            </>
        );
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto culpa dolor expedita libero mollitia nihil perferendis porro quam veniam! Accusantium autem consequuntur cupiditate dolorem doloribus, iure laborum nemo, nulla odio officiis reiciendis sequi sint ut veritatis, voluptates! Ab corporis cum cumque dolore dolores dolorum eos harum id, ipsa labore laborum, minus nam natus nulla pariatur porro sed sequi sit tempora tenetur! Cumque eius magnam molestias optio quas? Aliquam, explicabo velit? Assumenda doloribus facilis illo iure minus nostrum quos sed! Cumque, excepturi illum inventore iure nemo neque nostrum obcaecati quaerat qui ut. Atque ea eos fugit nihil pariatur provident quia?'
        ,
    },
};
