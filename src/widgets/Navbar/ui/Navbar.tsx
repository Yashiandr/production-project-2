import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import * as cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>

            <div className={cls.links}>
                <AppLink to="/" theme={AppLinkTheme.SECONDARY}>{t('Главная')}</AppLink>
                <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>{t('О сайте')}</AppLink>
            </div>
        </div>
    );
}
