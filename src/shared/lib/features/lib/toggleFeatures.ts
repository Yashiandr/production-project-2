import { FeatureFlags } from '../../../types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeaturesOptions<T, K> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => K;
}

export function toggleFeatures<T, K>({ off, on, name }: ToggleFeaturesOptions<T, K>): T | K {
    if (getFeatureFlag(name)) {
        return on();
    }

    return off();
}
