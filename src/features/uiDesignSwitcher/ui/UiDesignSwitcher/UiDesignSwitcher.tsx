import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { getFeatureFlag, updateFeatureFlags, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { selectUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(selectUserAuthData);
    const ListBox = toggleFeatures({
        name: 'isAppRedesign',
        on: () => ListBoxRedesigned,
        off: () => ListBoxDeprecated,
    });
    const Text = toggleFeatures({
        name: 'isAppRedesign',
        on: () => TextRedesigned,
        // @ts-ignore
        off: () => TextDeprecated,
    });
    const Skeleton = toggleFeatures({
        name: 'isAppRedesign',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const [isLoading, setIsLoading] = useState(false);

    const isAppRedesigned = getFeatureFlag('isAppRedesign');

    const items = [
        {
            content: t('Новый'),
            value: 'new',
        },
        {
            content: t('Старый'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(updateFeatureFlags({
                userId: authData.id,
                newFeatures: {
                    isAppRedesign: value === 'new',
                },
            })).unwrap();
            setIsLoading(false);
        }
    };

    return (
<HStack>
            <Text title={t('Вариант интерфейса')} />
            {isLoading ?
                <Skeleton width={100} height={38} />
                : (
<ListBox
                onChange={onChange}
                items={items}
                value={isAppRedesigned ? 'new' : 'old'}
                className={classNames('', {}, [className])}
/>
)}
</HStack>

    );
});
