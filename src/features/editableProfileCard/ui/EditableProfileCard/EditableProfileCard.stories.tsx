import type { Meta, StoryObj } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import defaultAvatar from 'shared/assets/stockImage/default-woman-avatar.jpg';
import { PageDecorator } from 'shared/config/storybook/PageDecorator/PageDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { EditableProfileCard } from './EditableProfileCard';

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

const meta = {
    title: 'features/Profile/EditableProfileCard',
    component: EditableProfileCard,
    args: {
        id: '1',
    },
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

    tags: ['autodocs'],

} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const withErrors: Story = {
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
