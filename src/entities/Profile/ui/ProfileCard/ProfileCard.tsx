import { Currency, CurrencySelect } from 'entities/Currency';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Country, CountrySelect } from '../../../Country';
import { Profile } from '../../model/types/profile';
import * as cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');
    const [isEditAvatar, setIsEditAvatar] = useState(true);

    const toggleEditAvatar = useCallback(() => {
        setIsEditAvatar(false);
    }, []);

    if (isLoading) {
        return (
            <VStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </VStack>
        );
    }

    if (error) {
        return (
            <VStack justify="center" gap="8" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t(error)}
                    align={TextAlign.CENTER}
                />
            </VStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack gap="16" align="start" className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar
                    && <Avatar src={data.avatar} alt={data.username || ''} className={cls.avatarWrapper} />}

            <Input
                value={data?.first}
                onChange={onChangeFirstname}
                readonly={readonly}
                placeholder={t('Ваше имя')}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                onChange={onChangeLastname}
                readonly={readonly}
                placeholder={t('Ваша фамилия')}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                onChange={onChangeAge}
                readonly={readonly}
                placeholder={t('Ваш возраст')}
                data-testid="ProfileCard.age"
            />
            <Input
                value={data?.city}
                onChange={onChangeCity}
                readonly={readonly}
                placeholder={t('Ваш город')}
                data-testid="ProfileCard.city"
            />
            {isEditAvatar
                ? (
                    <Button
                        onClick={toggleEditAvatar}
                        className={cls.editAvatarBtn}
                        disabled={readonly}
                    >
                        {t('Редактировать ссылку на аватар')}
                    </Button>
                )
                : (
                    <Input
                        className={cls.imgLink}
                        value={data?.avatar}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                        placeholder={t('Введите ссылку на аватар')}
                    />
                )}
            <Input
                value={data?.username}
                onChange={onChangeUsername}
                readonly={readonly}
                placeholder={t('Ваш юзернейм')}
            />
            <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
            <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
        </VStack>
    );
};
