import {
    lazy,
    Suspense,
} from 'react';
import { ProfileRatingProps } from './ProfileRating';

export const ProfileRatingLazy = lazy(() => (import('./ProfileRating')));

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
    <Suspense fallback={null}>
        <ProfileRatingLazy {...props} />
    </Suspense>
);
