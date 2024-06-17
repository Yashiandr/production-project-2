import { StateSchema } from 'app/providers/StoreProvider';
import { selectArticleDetailsData } from './selectArticleDetailsData';

describe('selectArticleDetailsData.test', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'title',
        };

        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };
        expect(selectArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {},
        };
        expect(selectArticleDetailsData(state as StateSchema)).toBeUndefined();
    });
});
