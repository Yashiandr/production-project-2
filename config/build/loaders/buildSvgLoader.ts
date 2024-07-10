export function buildSvgLoader() {
    return {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColor',
                            params: {
                                currentColor: true,
                            },
                        },
                    ],
                },
            },
        }],
        exclude: /node_modules/,
    };
}
