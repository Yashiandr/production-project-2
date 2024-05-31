export function buildSvgLoader() {
    return {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
    };
}
