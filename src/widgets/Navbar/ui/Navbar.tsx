import { selectUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/AppDispatch/AppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import * as cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(selectUserAuthData);
    const dispatch = useAppDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        setIsAuthModal(false);
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <div className={cls.links}>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        onClick={onLogout}
                    >
                        {t('Выйти')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>

            <div className={cls.links}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>
            </div>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
        </div>
    );
};
