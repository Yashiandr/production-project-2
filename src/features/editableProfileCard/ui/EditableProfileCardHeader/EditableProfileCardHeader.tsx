import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { selectCanEditProfile } from '../../model/selectors/selectCanEditProfile/selectCanEditProfile';
import { selectProfileReadonly } from '../../model/selectors/selectProfileReadonly/selectProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;
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
                        {readonly ? (
                            <Button
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редактировать')}
                            </Button>
                        ) : (
                            <HStack gap="4">
                                <Button
                                    onClick={onSave}
                                    theme={ButtonTheme.OUTLINE_GREEN}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Сохранить', { ns: 'translation' })}
                                </Button>
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Отменить', { ns: 'translation' })}
                                </Button>
                            </HStack>
                        )}
                    </>
                )}
            </HStack>
        );
    },
);
