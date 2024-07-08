import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import defaultAvatar from '@/shared/assets/stockImage/default-woman-avatar.jpg';
import { componentRender } from '@/shared/config/tests/componentRender/componentRender';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const data: Profile = {
    id: '1',
    first: 'Test',
    lastname: 'Test Last',
    age: 18,
    country: Country.Russia,
    currency: Currency.RUB,
    city: 'Test City',
    avatar: defaultAvatar,
    username: 'Test Username',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data,
            form: data,
        },
        user: {
            authData: { id: '1', username: 'test' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('EditableProfileCard', () => {
    test('Режим readonly переключается', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );
        expect(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        ).toBeInTheDocument();
    });

    test('При отмене значения должны возвращаться в исходное состояние', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        );
        await userEvent.type(
            screen.getByTestId('ProfileCard.lastname'),
            'user',
        );

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        );

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Test');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(
            'Test Last',
        );
    });

    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        );

        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        );

        expect(mockPutReq).toHaveBeenCalled();
    });
});
