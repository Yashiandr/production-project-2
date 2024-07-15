import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SearchIcon from '@/shared/assets/redesignIcons/Search.svg?react';

interface ArticlesSearchProps {
    className?: string;
    onChangeSearch: (newSearch: string) => void;
    search: string;

}

export const ArticlesSearch = memo((props: ArticlesSearchProps) => {
    const {
        className,
        onChangeSearch,
        search,
    } = props;
    const { t } = useTranslation('articles');
    return (
        <Input
            className={className}
            placeholder={t('Поиск')}
            onChange={onChangeSearch}
            value={search}
            addonLeft={<Icon Svg={SearchIcon} />}
        />
    );
});
