import React from 'react';
import { useTranslation } from 'react-i18next';
import { isBrowser } from 'react-device-detect';
import { VStack, HStack, getVStack } from '@/shared/ui/redesigned/Stack';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Country, CountrySelect } from '../../../Country';
import { Profile } from '../../model/types/profile';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { StackArgs } from '@/shared/ui/redesigned/Stack/types/flex';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

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

const ProfileCardError = ({ error }: { error: string }) => (
    <Card padding="24" className={getVStack({ justify: 'center', max: true })}>
        {error}
    </Card>
);

const ProfileCardSkeletonBrowser = () => (
    <Card padding="24" className={getVStack({ gap: '32', max: true })}>
        <Skeleton width={128} height={128} border="50%" />
        <HStack gap="32" max>
            <VStack gap="16" max>
                <Skeleton height={38} />
                <Skeleton height={38} />
                <Skeleton height={38} />
                <Skeleton height={38} />
            </VStack>
            <VStack gap="16" max>
                <Skeleton height={38} />
                <Skeleton height={38} />
                <Skeleton height={38} />
                <Skeleton height={38} />
            </VStack>
        </HStack>
    </Card>
);

const ProfileCardSkeletonMobile = () => (
    <Card padding="24" className={getVStack({ gap: '32', max: true })}>
        <Skeleton width={128} height={128} border="50%" />
        <VStack gap="8" max>
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
        </VStack>
    </Card>
);

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

    if (isLoading) {
        return isBrowser ? <ProfileCardSkeletonBrowser /> : <ProfileCardSkeletonMobile />;
    }

    if (error) {
        return <ProfileCardError error={t(error)} />;
    }

    const stackOptions: StackArgs = {
        gap: '32',
        max: true,
    };

    const content = isBrowser ? (
        <HStack max gap="24">
            <VStack max gap="16" align="start">
                <Input
                    value={data?.first}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                    label={t('Имя')}
                    data-testid="ProfileCard.firstname"
                />
                <Input
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    readonly={readonly}
                    label={t('Фамилия')}
                    data-testid="ProfileCard.lastname"
                />
                <Input
                    value={data?.age}
                    onChange={onChangeAge}
                    readonly={readonly}
                    label={t('Возраст')}
                    data-testid="ProfileCard.age"
                />
                <Input
                    value={data?.city}
                    onChange={onChangeCity}
                    readonly={readonly}
                    label={t('Город')}
                    data-testid="ProfileCard.city"
                />
            </VStack>
            <VStack max gap="16" align="start">
                <Input
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                    label={t('Ссылка на аватар')}
                />
                <Input
                    value={data?.username}
                    onChange={onChangeUsername}
                    readonly={readonly}
                    label={t('Юзернейм')}
                />
                <CurrencySelect
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </VStack>
        </HStack>
    ) : (
        <VStack
            max
            gap="8"
            align="start"
        >
            <Input
                value={data?.first}
                onChange={onChangeFirstname}
                readonly={readonly}
                label={t('Имя')}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                onChange={onChangeLastname}
                readonly={readonly}
                label={t('Фамилия')}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                onChange={onChangeAge}
                readonly={readonly}
                label={t('Возраст')}
                data-testid="ProfileCard.age"
            />
            <Input
                value={data?.city}
                onChange={onChangeCity}
                readonly={readonly}
                label={t('Город')}
                data-testid="ProfileCard.city"
            />
            <Input
                value={data?.avatar}
                onChange={onChangeAvatar}
                readonly={readonly}
                label={t('Ссылка на аватар')}
            />
            <Input
                value={data?.username}
                onChange={onChangeUsername}
                readonly={readonly}
                label={t('Юзернейм')}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );

    return (
        <Card
            padding="24"
            border="partial"
            className={classNames('', {}, [className, getVStack(stackOptions)])}
        >
            {data?.avatar && (
                <Avatar src={data?.avatar} size={128} />
            )}
            {content}
        </Card>
    );
};
