import 'app/styles/index.scss';
import './storybook.scss';
import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const StyleDecorator = (Story: StoryFn) => {
    document.body.classList.add(Theme.LIGHT);
    return <Story />;
};
