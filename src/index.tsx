import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import './shared/config/i18n/i18n';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { ErrorBoundary } from './app/providers/ErrorBoundary';
import '@/app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Не удалось вмонтировать React компонент');
}
const root = createRoot(container);

console.log(__API__);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
