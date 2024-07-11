import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Belarus, content: Country.Belarus },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesign" on={(
            <ListBox
                className={classNames('', {}, [className])}
                onChange={onChangeHandler}
                value={value}
                label={t('Страна')}
                defaultValue={t('Страна')}
                readonly={readonly}
                items={options}
            />
        )} off={(
            <ListBoxDeprecated
                className={classNames('', {}, [className])}
                onChange={onChangeHandler}
                value={value}
                label={t('Укажите страну')}
                defaultValue={t('Укажите страну')}
                readonly={readonly}
                items={options}
            />
        )}
        />

    );
});
