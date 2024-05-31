import { StoryFn } from '@storybook/react';
import './PageDecorator.scss';

export const PageDecorator = (Story: StoryFn) => (
    <div className="page">
        <div className="page-wrapper"><Story /></div>
    </div>
);
