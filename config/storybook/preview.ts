import type { Preview } from '@storybook/react';
import i18n from '../../src/shared/config/i18n/i18n';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        StyleDecorator,
        RouteDecorator,
        TranslationDecorator,
        ThemeDecorator(),
    ],
};

i18n.on('languageChanged', (locale) => {
    document.dir = i18n.dir(locale);
});

export default preview;
