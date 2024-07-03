import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { selectProfileValidateErrors } from './selectProfileValidateErrors';

describe('selectProfileValidateErrors.test', () => {
    test('should return ServerError', () => {
        const validateErrors = [ValidateProfileError.SERVER_ERROR];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(selectProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
    });
    test('should return array of errors,', () => {
        const validateErrors = [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_COUNTRY];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(selectProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(selectProfileValidateErrors(state as StateSchema)).toBeUndefined();
    });
});
