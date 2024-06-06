import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import * as cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>

            <div className={cls.links}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onToggleModal}
                >
                    {t('Войти')}
                </Button>
            </div>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci asperiores aspernatur consequatur
                dolore doloribus error eum exercitationem expedita illo incidunt, laudantium libero minima non odit
                perferendis perspiciatis quaerat quasi, qui, quidem reiciendis rem reprehenderit similique sint ullam.
                Culpa cumque dolor, nostrum quia sit suscipit tempora! Ipsa necessitatibus quae sequi.
            </Modal>
        </div>
    );
};
