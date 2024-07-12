import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, getHStack } from '@/shared/ui/redesigned/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { selectCanEditProfile } from '../../model/selectors/selectCanEditProfile/selectCanEditProfile';
import { selectProfileReadonly } from '../../model/selectors/selectProfileReadonly/selectProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';

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
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <Card
                        border="partial"
                        padding="24"
                        className={classNames('', {}, [className, getHStack({
                            justify: 'between',
                            max: true,
                        })])}
                    >
                        <Text title={t('Профиль пользователя')} />
                        {canEdit &&
                            (readonly ? (
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
                                        color="success"
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                    >
                                        {t('Сохранить', { ns: 'translation' })}
                                    </Button>
                                    <Button
                                        onClick={onCancelEdit}
                                        color="error"
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                    >
                                        {t('Отменить', { ns: 'translation' })}
                                    </Button>
                                </HStack>
                            ))}
                    </Card>
                )}
                off={(
                    <HStack justify="between" className={className}>
                        <TextDeprecated title={t('Профиль пользователя')} />
                        {canEdit &&
                            (readonly ? (
                                <ButtonDeprecated
                                    onClick={onEdit}
                                    data-testid="EditableProfileCardHeader.EditButton"
                                >
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            ) : (
                                <HStack gap="4">
                                    <ButtonDeprecated
                                        onClick={onSave}
                                        theme={ButtonTheme.OUTLINE_GREEN}
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                    >
                                        {t('Сохранить', { ns: 'translation' })}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        onClick={onCancelEdit}
                                        theme={ButtonTheme.OUTLINE_RED}
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                    >
                                        {t('Отменить', { ns: 'translation' })}
                                    </ButtonDeprecated>
                                </HStack>
                            ))}
                    </HStack>
                )}
            />

        );
    },
);
