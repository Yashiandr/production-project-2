import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { selectUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import * as cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';

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
                <TextDeprecated className={cls.logo} title={t('App')} size={TextSize.L} />
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
            <TextDeprecated
                className={cls.logo}
                title={t('App')}
                size={TextSize.L}
            />
            <div>
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </ButtonDeprecated>
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
            )} off={<DeprecatedNavbar className={className} />}
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
                        size="l"
                    />
                    <div>
                        <Button
                            variant="clear"
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
            off={<DeprecatedNavbar className={className} />}
        />
    );
});
