import { memo } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import OrangeIcon from '@/shared/assets/icons/theme-orange.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

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
