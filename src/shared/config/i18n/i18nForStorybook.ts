import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`../../../../public/locales/${language}/${namespace}`),
        ),
    )
    .init({
        fallbackLng: 'ru',
        debug: __IS_DEV__,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
