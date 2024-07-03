import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import ProfileRating from './ProfileRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const rating = [{
    id: '1', rate: 3,
}];

const meta = {
    title: 'features/Profile/ProfileRating',
    component: ProfileRating,
    decorators: [StoreDecorator({})],
    parameters: {
        loki: { skip: true },
    },
    args: {
        profileId: '1',
    },

} satisfies Meta<typeof ProfileRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    parameters: {
        mockData: [
            {
                url: `${__API__}/profile-ratings?userId=&profileId=1`,
                method: 'GET',
                status: 200,
                response: rating,
            },
        ],
    },
};

export const WithoutRating: Story = {
    parameters: {
        mockData: [
            {
                url: `${__API__}/profile-ratings?userId=&profileId=1`,
                method: 'GET',
                status: 200,
                response: undefined,
            },
        ],
    },
};
