import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <ListBox
                    className={classNames('', {}, [className])}
                    onChange={onChangeHandler}
                    value={value}
                    defaultValue={t('Валюта')}
                    label={t('Валюта')}
                    readonly={readonly}
                    items={options}
                />
            )}
            off={(
                <ListBoxDeprecated
                    className={classNames('', {}, [className])}
                    onChange={onChangeHandler}
                    value={value}
                    defaultValue={t('Укажите валюту')}
                    label={t('Укажите валюту')}
                    readonly={readonly}
                    items={options}
                />
            )}
        />

    );
});
