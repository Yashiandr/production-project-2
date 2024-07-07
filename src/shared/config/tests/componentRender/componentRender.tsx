import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import {
    StateSchema,
    StoreProvider,
} from '@/app/providers/StoreProvider';
// eslint-disable-next-line yashiandr-app-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18nForTest from '../../i18n/i18nForTest';
import { Theme } from '../../../const/theme';
// eslint-disable-next-line yashiandr-app-plugin/layer-imports
import '@/app/styles/index.scss';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    theme?: Theme;
}

export interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

window.ResizeObserver = window.ResizeObserver
    || jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

export function TestProvider(props: TestProviderProps) {
    const { children, options = {} } = props;

    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState as StateSchema} asyncReducers={asyncReducers}>
                <I18nextProvider i18n={i18nForTest}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>
                            {children}
                        </div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
