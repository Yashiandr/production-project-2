import { createAsyncThunk } from '@reduxjs/toolkit';
import { FeatureFlags } from '../../../types/featureFlags';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '../api/featureFlagApi';
import { getAllFeatureFlag } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsOptions,
    ThunkConfig<string>
>('features/updateFeaturesFlags', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: {
                    ...getAllFeatureFlag(),
                    ...newFeatures,
                },
            }),
        );

        window.location.reload();
    } catch (e) {
        console.log(e);
        rejectWithValue('Не удалось применить настройки');
    }
});
