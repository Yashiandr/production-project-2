import { Decorator } from '@storybook/react';
// eslint-disable-next-line yashiandr-app-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '../../../const/theme';
import { toggleFeatures } from '../../../lib/features';

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
    const { theme } = globals;

    const themeKeys = Object.keys(Theme).filter((k) => Number.isNaN(Number(k))) as Array<keyof typeof Theme>;

    themeKeys.forEach((item) => {
        document.body.classList.remove(Theme[item]);
    });
    document.body.classList.add(theme || Theme.LIGHT);

    return (
        <ThemeProvider>
            <div className={toggleFeatures({
                name: 'isAppRedesign',
                on: () => 'app',
                off: () => 'app_redesigned',
            })}
            >
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
