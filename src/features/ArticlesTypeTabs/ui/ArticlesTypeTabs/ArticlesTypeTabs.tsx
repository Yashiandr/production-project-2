import {
    memo,
    useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
    TabItem,
    Tabs,
} from '@/shared/ui/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticlesTypeTabProps {
    className?: string;
    onChangeType: (tab: TabItem<ArticleType>) => void;
    type: ArticleType
}

export const ArticlesTypeTabs = memo((props: ArticlesTypeTabProps) => {
    const {
        className,
        onChangeType,
        type,
    } = props;
    const { t } = useTranslation('articles');

    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => Object.keys(ArticleType).map((item) => ({
        value: item as ArticleType,
        content: t(item),
    })), [t]);
    return (
        <Tabs
            className={className}
            tabs={typeTabs}
            value={type}
            onTabClick={onChangeType as (tab: TabItem<string>) => void}
        />
    );
});
