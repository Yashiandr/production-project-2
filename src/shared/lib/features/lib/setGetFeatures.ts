import { FeatureFlags } from '../../../types/featureFlags';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '../../../const/localstorage';

const defaultFeatures: FeatureFlags = {
    isAppRedesign: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlag(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}

export function getAllFeatureFlag() {
    return featureFlags;
}
