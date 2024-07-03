import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import { StarRating } from './StarRating';

const meta = {
    title: 'shared/StarRating',
    component: StarRating,
    args: {},

    tags: ['autodocs'],

} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const withSelectedStars = {
    args: {
        selectedStars: 3,
    },
};
