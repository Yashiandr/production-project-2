import type {
    Meta,
    StoryObj,
} from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '@/features/editableProfileCard';

import defaultAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ProfilePage from './ProfilePage';

const data = {
    first: 'Test',
    lastname: 'Test Last',
    age: 18,
    country: Country.Russia,
    currency: Currency.RUB,
    city: 'Test City',
    avatar: defaultAvatar,
    username: 'Test Username',
};

const rating = [{
    id: '1', rate: 5, feedback: 'Дефолтный мэн', userId: '1', profileId: '1',
}];

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    parameters: {
        mockData: [
            {
                url: `${__API__}/profile-ratings?userId=1&profileId=`,
                method: 'GET',
                status: 200,
                response: rating,
            },
        ],
    },

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            profile: {
                form: data,
                data,
                readonly: true,
                isLoading: false,
            },
        }),
    ],

} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const withErrors: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            scroll: { scrollSave: {} },
            profile: {
                form: {
                    first: '',
                    lastname: '',
                    age: undefined,
                    country: undefined,
                    currency: Currency.RUB,
                    avatar: defaultAvatar,
                    username: 'ErrorUser',
                },
                validateErrors: [
                    ValidateProfileError.INCORRECT_USER_DATA,
                    ValidateProfileError.INCORRECT_COUNTRY,
                    ValidateProfileError.INCORRECT_AGE,
                ],
            },
        }),
    ],
};
