import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export function LangSwitcher({ className, short = false }: LangSwitcherProps) {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            onClick={toggle}
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
        >
            {short ? t('Короткий язык') : t('Язык')}
        </Button>
    );
}
