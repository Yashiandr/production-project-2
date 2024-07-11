import { rtkApi } from '../../../api/rtkApi';
import { FeatureFlags } from '../../../types/featureFlags';

interface UpdateFeatureFlagsOprions{
    userId: string;
    features: Partial<FeatureFlags>
}

const featureFlagApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOprions>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutation =
    featureFlagApi.endpoints.updateFeatureFlags.initiate;
