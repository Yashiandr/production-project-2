// eslint-disable-next-line yashiandr-app-plugin/layer-imports
import '@/app/styles/index.scss';
import './storybook.scss';
import { StoryFn } from '@storybook/react';

export const StyleDecorator = (Story: StoryFn) => <Story />;
