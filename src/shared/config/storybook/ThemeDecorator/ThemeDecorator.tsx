import { Decorator } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
    const { theme } = globals;
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
