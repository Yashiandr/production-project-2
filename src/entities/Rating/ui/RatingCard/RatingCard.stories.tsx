import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import { RatingCard } from './RatingCard';

const meta = {
    title: 'entities/RatingCard',
    component: RatingCard,

    tags: ['autodocs'],

} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const WithTitle: Story = {
    args: {
        title: 'title',
    },
};

export const WithModel: Story = {
    args: {
        title: 'Click the Star!',
        hasFeedback: true,
        feedbackTitle: 'Hello world!',
    },
};
