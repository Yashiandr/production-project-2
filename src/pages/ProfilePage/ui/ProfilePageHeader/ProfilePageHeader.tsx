import { profileActions, selectProfileReadonly, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { selectCanEdit } from '../../model/selectors/selectCanEdit/selectCanEdit';
import * as cls from './ProfilePageHeader.module.scss';

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
    const canEdit = useAppSelector(selectCanEdit);

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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль пользователя')} />
            {canEdit
                && (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <>
                        {
                            readonly
                                ? (
                                    <Button
                                        onClick={onEdit}
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                )
                                : (
                                    <div
                                        className={cls.buttons}
                                    >
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
                                    </div>
                                )
                        }
                    </>
                )}
        </div>
    );
};
