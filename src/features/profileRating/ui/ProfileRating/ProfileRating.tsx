import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { RatingCard } from '@/entities/Rating';
import {
    useGetProfileRating,
    useRateProfile,
} from '../../api/profileRatingApi';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { selectUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import * as cls from './ProfileRating.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId } = props;
    const { t } = useTranslation('profile');
    const userData = useAppSelector(selectUserAuthData);

    const { data, isLoading } = useGetProfileRating({
        profileId,
        userId: userData?.id ?? '',
    });

    const [rateProfileMutation] = useRateProfile();

    const handleRateProfile = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateProfileMutation({
                    userId: userData?.id ?? '',
                    profileId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [profileId, rateProfileMutation, userData?.id],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateProfile(starsCount);
        },
        [handleRateProfile],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateProfile(starsCount, feedback);
        },
        [handleRateProfile],
    );

    if (profileId === userData?.id) {
        return null;
    }

    if (isLoading) {
        return (
            <Card className={cls.ProfileRating}>
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
            className={classNames(cls.ProfileRating, {}, [className])}
            title={t('Оцените профиль')}
            hasFeedback
            feedbackTitle={t('Оставьте свой отзыв о данном пользователе')}
        />
    );
});

export default ProfileRating;
