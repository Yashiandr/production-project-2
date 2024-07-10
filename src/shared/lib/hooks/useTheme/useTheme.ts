import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.ORANGE;
                break;
            case Theme.ORANGE:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.ORANGE;
        }
        setTheme?.(newTheme);
        const themeKeys = Object.keys(Theme).filter((k) => Number.isNaN(Number(k))) as Array<keyof typeof Theme>;

        themeKeys.forEach((item) => {
            document.body.classList.remove(Theme[item]);
        });

        document.body.classList.add(newTheme);

        saveAction?.(newTheme);
    };

    return { theme, toggleTheme };
}
