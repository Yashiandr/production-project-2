import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(
    ({ className, short = false }: LangSwitcherProps) => {
        const { t, i18n } = useTranslation();

        const toggle = () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
        };

        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <Button
                        variant="clear"
                        onClick={toggle}
                    >
                        {t('Короткий язык редизайн')}
                    </Button>
                )}
                off={(
                    <ButtonDeprecated
                        onClick={toggle}
                        theme={ButtonTheme.CLEAR}
                        className={classNames('', {}, [className])}
                    >
                        {short ? t('Короткий язык') : t('Язык')}
                    </ButtonDeprecated>
                )}
            />

        );
    },
);
