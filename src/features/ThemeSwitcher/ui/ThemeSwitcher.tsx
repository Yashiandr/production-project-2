import { memo, useCallback } from 'react';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg?react';
import LightIcon from '@/shared/assets/icons/theme-light.svg?react';
import OrangeIcon from '@/shared/assets/icons/theme-orange.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

let ThemeIcon;

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);

    switch (theme) {
        case Theme.DARK:
            ThemeIcon = DarkIcon;
            break;
        case Theme.LIGHT:
            ThemeIcon = LightIcon;
            break;
        case Theme.ORANGE:
            ThemeIcon = OrangeIcon;
            break;
        default:
            ThemeIcon = LightIcon;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={<Icon Svg={ThemeIcon} onClick={onToggleHandler} clickable className={className} />}
            off={(
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandler}
                    theme={ButtonTheme.CLEAR}
                >
                    <ThemeIcon />
                </ButtonDeprecated>
            )}
        />
    );
});
