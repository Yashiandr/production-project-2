import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { RatingCard } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { selectUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('articles');
    const userData = useAppSelector(selectUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return (
            <Card>
                <Skeleton width="100%" height={118} />
            </Card>
        );
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            hasFeedback
            feedbackTitle={t(
                'Оставьте свой отзыв о статье, это поможет улучшить качество',
            )}
        />
    );
});

export default ArticleRating;
