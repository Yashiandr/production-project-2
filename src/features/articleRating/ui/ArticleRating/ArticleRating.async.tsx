import {
    lazy,
    Suspense,
} from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Card } from '@/shared/ui/Card/Card';

export const ArticleRatingLazy = lazy(
    () => import('./ArticleRating'),
);

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<Card><Skeleton width="100%" height={118} /></Card>}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
