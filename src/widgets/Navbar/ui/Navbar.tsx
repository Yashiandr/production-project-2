import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import * as cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';

interface NavbarProps {
    className?: string;
}

const DeprecatedNavbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useAppSelector(selectUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.logo} title={t('App')} size={TextSize.L} />
                <HStack gap="8">
                    <AppLink to={getRouteArticleCreate()}>
                        {t('Создать статью')}
                    </AppLink>
                    <HStack gap="16" className={cls.actions}>
                        <NotificationButton />
                        <AvatarDropdown authData={authData} />
                    </HStack>
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
                className={cls.logo}
                title={t('Yashiandr App')}
                size={TextSize.L}
            />
            <div>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>
            </div>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useAppSelector(selectUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesign" on={(
                <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <HStack gap="16" className={cls.actions}>
                        <NotificationButton />
                        <AvatarDropdown authData={authData} />
                    </HStack>
                </header>
            )} off={<DeprecatedNavbar />}
            />

        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <Text
                        className={cls.logo}
                        title={t('Yashiandr App')}
                        size={TextSize.L}
                    />
                    <div>
                        <Button
                            theme={ButtonTheme.CLEAR_INVERTED}
                            onClick={onShowModal}
                        >
                            {t('Войти')}
                        </Button>
                    </div>
                    {isAuthModal && (
                        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
                    )}
                </header>
            )}
            off={<DeprecatedNavbar />}
        />
    );
});
