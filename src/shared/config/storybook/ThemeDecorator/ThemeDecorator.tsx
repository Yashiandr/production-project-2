import { StoryFn } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme = Theme.LIGHT) => (StoryComponent: StoryFn) => {
    document.body.classList.replace(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT, theme);
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
