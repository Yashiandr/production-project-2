import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import './shared/config/i18n/i18n';
import { StoreProvider } from '@/app/providers/StoreProvider';

import { ErrorBoundary } from './app/providers/ErrorBoundary';
import '@/app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Не удалось вмонтировать React компонент');
}
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
