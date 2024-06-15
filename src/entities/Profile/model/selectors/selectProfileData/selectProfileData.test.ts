import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { selectProfileData } from './selectProfileData';

describe('selectProfileData.test', () => {
    test('should return data', () => {
        const data = {
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
                data,
            },
        };
        expect(selectProfileData(state as StateSchema)).toEqual(data);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileData(state as StateSchema)).toBeUndefined();
    });
});
