import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import defaultAvatar from 'shared/assets/stockImage/defaule-woman-avatar.jpg';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,

    tags: ['autodocs'],
    decorators: [
        PageDecorator,
        StoreDecorator({
            profile: {
                form: {
                    first: 'Test',
                    lastname: 'Test Last',
                    age: 18,
                    country: Country.Russia,
                    currency: Currency.RUB,
                    city: 'Test City',
                    avatar: defaultAvatar,
                    username: 'Test Username',
                },
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

export const Dark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Orange: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.ORANGE),
    ],
};

export const withErrors: Story = {
    args: {},
    decorators: [
        StoreDecorator({
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
