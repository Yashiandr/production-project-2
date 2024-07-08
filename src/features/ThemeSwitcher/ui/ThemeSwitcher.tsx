import { memo } from 'react';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg?react';
import LightIcon from '@/shared/assets/icons/theme-light.svg?react';
import OrangeIcon from '@/shared/assets/icons/theme-orange.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeSwitcherProps {
    className?: string;
}

let ThemeIcon;

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    switch (theme) {
        case Theme.DARK:
            ThemeIcon = <DarkIcon />;
            break;
        case Theme.LIGHT:
            ThemeIcon = <LightIcon />;
            break;
        case Theme.ORANGE:
            ThemeIcon = <OrangeIcon />;
            break;
        default:
            ThemeIcon = <LightIcon />;
    }

    return (
        <Button
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
            theme={ButtonTheme.CLEAR}
        >
            {ThemeIcon}
        </Button>
    );
});
