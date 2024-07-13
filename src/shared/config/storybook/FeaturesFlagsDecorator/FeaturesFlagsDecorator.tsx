import { StoryFn } from '@storybook/react';
import { FeatureFlags } from '../../../types/featureFlags';
import { setFeatureFlag } from '../../../lib/features';

export const FeaturesFlagsDecorator = (features: FeatureFlags) => (StoryComponent: StoryFn) => {
    setFeatureFlag(features);
    return (
        <StoryComponent />
    );
};
