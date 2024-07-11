import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticlesFilter.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticlesTypeTabs } from '@/features/ArticlesTypeTabs';
import { getVStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import SearchIcon from '@/shared/assets/redesignIcons/Search.svg?react';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFilterProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (newSearch: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (tab: TabItem<ArticleType>) => void;
}

export const ArticlesFilter = memo((props: ArticlesFilterProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
        type,
        onChangeType,
        search,
        onChangeSearch,
    } = props;
    const { t } = useTranslation('articles');

    return (
        <Card
            padding="24"
            className={classNames(cls.ArticlesFilter, {}, [className, getVStack({ gap: '32', align: 'start' })])}
        >
            <Input
                placeholder={t('Поиск')}
                onChange={onChangeSearch}
                value={search}
                addonLeft={<Icon Svg={SearchIcon} />}
            />
            <ArticlesTypeTabs onChangeType={onChangeType} type={type} />
            <ArticlesSortSelector
                sort={sort}
                order={order}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
            />
        </Card>
    );
});
