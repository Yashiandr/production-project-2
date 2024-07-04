import {
    memo,
    useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import {
    Select,
    SelectOption,
} from '@/shared/ui/Select';
import { HStack } from '@/shared/ui/Stack';
import { ArticleSortField } from '../../model/consts/consts';

interface ArticlesSortSelectorProps {
    className?: string;
    sort: ArticleSortField,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticlesSortSelector = memo((props: ArticlesSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props;
    const { t } = useTranslation('articles');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
    ], [t]);

    return (
        <HStack gap="8" className={classNames('', {}, [className])}>
            <Select
                label={t('Сортировать по')}
                options={sortFieldOptions}
                onChange={onChangeSort}
                value={sort}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                onChange={onChangeOrder}
                value={order}
            />
        </HStack>
    );
});
