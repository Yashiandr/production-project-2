import { profileActions, selectProfileReadonly, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { selectCanEditProfile } from '../../model/selectors/selectCanEditProfile/selectCanEditProfile';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation(['profile', 'translation']);
    const dispatch = useAppDispatch();
    const readonly = useAppSelector(selectProfileReadonly);
    const canEdit = useAppSelector(selectCanEditProfile);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    return (
        <HStack justify="between" className={className}>
            <Text title={t('Профиль пользователя')} />
            {canEdit && (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {readonly
                        ? (
                            <Button onClick={onEdit}>
                                {t('Редактировать')}
                            </Button>
                        )
                        : (
                            <HStack gap="4">
                                <Button
                                    onClick={onSave}
                                    theme={ButtonTheme.OUTLINE_GREEN}
                                >
                                    {t('Сохранить', { ns: 'translation' })}
                                </Button>
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t('Отменить', { ns: 'translation' })}
                                </Button>
                            </HStack>
                        )}
                </>
            )}
        </HStack>
    );
};
