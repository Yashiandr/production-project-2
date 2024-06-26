import { Decorator } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
    const { theme } = globals;

    const themeKeys = Object.keys(Theme).filter((k) => Number.isNaN(Number(k))) as Array<keyof typeof Theme>;

    themeKeys.forEach((item) => {
        document.body.classList.remove(Theme[item]);
    });
    document.body.classList.add(theme || Theme.LIGHT);

    return (
        <ThemeProvider>
            <div className="app">
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
