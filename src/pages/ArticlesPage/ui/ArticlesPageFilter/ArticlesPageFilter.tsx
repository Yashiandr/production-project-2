import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticlesTypeTabs } from '@/features/ArticlesTypeTabs';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo((props: ArticlesPageFilterProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');
    const {
        view,
        sort,
        order,
        type,
        search,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
        onChangeView,
    } = useArticlesFilter();

    return (
        <VStack
            align="stretch"
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            <HStack justify="between">
                <ArticlesSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticlesViewSelector view={view} onViewClick={onChangeView} />
            </HStack>
            <Card>
                <Input
                    placeholder={t('Поиск')}
                    onChange={onChangeSearch}
                    value={search}
                />
            </Card>
            <ArticlesTypeTabs onChangeType={onChangeType} type={type} />
        </VStack>
    );
});
