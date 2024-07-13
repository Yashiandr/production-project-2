import type { Meta, StoryObj } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import defaultAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';
import { ProfileCardDeprecated } from './ProfileCardDeprecated';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCardDeprecated,
    args: {
        data: {
            first: 'Test',
            lastname: 'Test Last',
            age: 18,
            country: Country.Russia,
            currency: Currency.RUB,
            city: 'Test City',
            avatar: defaultAvatar,
            username: 'Test Username',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProfileCardDeprecated>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryRedesigned: Story = {
    render(props) {
    return <ProfileCard {...props} />;
},
    decorators: [FeaturesFlagsDecorator({ isAppRedesign: true })],
};

export const IsLoading: Story = {
    args: {
        isLoading: true,
    },
};

export const WithError: Story = {
    args: {
        error: 'error',
    },
};
