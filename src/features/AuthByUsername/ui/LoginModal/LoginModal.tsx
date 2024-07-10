import { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const { className, isOpen, onClose } = props;

    const loginForm = <LoginFormAsync onSuccess={onClose} />;

    if (isMobile) {
        return <Drawer onClose={onClose} isOpen={isOpen} className={className}>{loginForm}</Drawer>;
    }

    return (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader />}>
                {loginForm}
            </Suspense>
        </Modal>
    );
};
