import type { Preview } from '@storybook/react';
import i18n from '@/shared/config/i18n/i18n';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '@/shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { Theme } from '@/shared/const/theme';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'fullscreen',
        backgrounds: {
            default: 'Light',
            values: [
                {
                    name: 'Light',
                    value: '#CCCC99',
                },
                {
                    name: 'Dark',
                    value: '#222222',
                },
                {
                    name: 'Orange',
                    value: '#FFFFFF',
                },
            ],
        },
        themes: {
            default: 'Light',
            list: [
                { name: 'Light', class: Theme.LIGHT, color: '#fff' },
                { name: 'Dark', class: Theme.DARK, color: '#000' },
                { name: 'Orange', class: Theme.ORANGE, color: '#ff9900' },
            ],
        },
    },

    globalTypes: {
        theme: {
            description: 'Global theme component',
            toolbar: {
                title: 'Theme',
                icon: 'circle',
                items: [
                    { value: undefined, title: 'Without' },
                    { value: Theme.LIGHT, title: 'Light' },
                    { value: Theme.DARK, title: 'Dark' },
                    { value: Theme.ORANGE, title: 'Orange' },
                ],
                dynamicTitle: true,
            },
        },
    },

    decorators: [
        StyleDecorator,
        RouteDecorator,
        TranslationDecorator,
        ThemeDecorator,
    ],

    tags: ['autodocs'],
};

i18n.on('languageChanged', (locale) => {
    document.dir = i18n.dir(locale);
});

export default preview;
