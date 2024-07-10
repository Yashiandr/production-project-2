import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticlesSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticlesSortSelector = memo((props: ArticlesSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation('articles');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
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
        ],
        [t],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <VStack align="start" gap="8" className={classNames('', {}, [className])}>
                    <Text text={t('Сортировать по:')} />
                    <ListBox
                        items={sortFieldOptions}
                        onChange={onChangeSort}
                        value={sort}
                    />
                    <ListBox
                        items={orderOptions}
                        onChange={onChangeOrder}
                        value={order}
                    />
                </VStack>
            )}
            off={(
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
            )}
        />

    );
});
