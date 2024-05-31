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
    };
    // eslint-disable-next-line no-param-reassign
    config.resolve.modules = [paths.src, 'node_modules'];
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push(buildCssLoader(true));
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((rule: webpack.RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });
    config.module.rules.push(buildSvgLoader());

    return config;
};
