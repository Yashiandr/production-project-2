import path from 'path';
import webpack from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    // eslint-disable-next-line no-param-reassign
    config!.resolve!.modules = [paths.src, 'node_modules'];
    config!.resolve!.alias = { '@': paths.src };
    config!.resolve!.extensions!.push('.ts', '.tsx');

    config!.module!.rules!.push(buildCssLoader(true));
    // eslint-disable-next-line no-param-reassign
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map(
        (rule: webpack.RuleSetRule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
        },
    );
    config!.module!.rules.push(buildSvgLoader());
    config!.plugins!.push(
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('http://testapi.ru'),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );
    return config;
};
