import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeContext } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { useMemo, useState } from 'react';

export const ThemeDecorator = (newTheme: Theme = Theme.LIGHT) => (StoryComponent: StoryFn) => {
    const [theme, setTheme] = useState<Theme>(newTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeContext.Provider>
    );
};
