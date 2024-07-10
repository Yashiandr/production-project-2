import { memo } from 'react';
import { ArticlesFilter } from '@/widgets/ArticlesFilter';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface FilterContainerProps {
    className?: string;
}

export const FilterContainer = memo((props: FilterContainerProps) => {
    const {
        className,
    } = props;

    const {
        sort,
        order,
        type,
        search,
        onChangeSearch,
        onChangeOrder,
        onChangeSort,
        onChangeType,
    } = useArticlesFilter();

    return (
        <ArticlesFilter
            className={className}
            sort={sort}
            order={order}
            type={type}
            search={search}
            onChangeSearch={onChangeSearch}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
        />
    );
});
