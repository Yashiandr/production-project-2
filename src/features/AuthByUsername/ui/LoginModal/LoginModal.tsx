import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import * as cls from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    storybook?: boolean;
}

export const LoginModal = (props: LoginModalProps) => {
    const {
        className,
        isOpen,
        storybook,
        onClose,
    } = props;

    return (
        <Modal
            className={classNames(cls.LoginModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            storybook={storybook}
        >
            <LoginForm />
        </Modal>
    );
};
