import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr({
        svgrOptions: {
            icon: true,
            svgoConfig: {
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeTitle: false,
                            },
                        },
                    },
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true,
                        },
                    },
                ],
            },
        },
    }),
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
    server: {
        proxy: {
            'http://localhost:8000': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
