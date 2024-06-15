import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { selectProfileForm } from './selectProfileForm';

describe('selectProfileForm.test', () => {
    test('should return form', () => {
        const form = {
            first: 'Test',
            lastname: 'Test Last',
            age: 18,
            country: Country.Russia,
            currency: Currency.RUB,
            city: 'Test City',
            username: 'Test Username',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        };
        expect(selectProfileForm(state as StateSchema)).toEqual(form);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileForm(state as StateSchema)).toBeUndefined();
    });
});
