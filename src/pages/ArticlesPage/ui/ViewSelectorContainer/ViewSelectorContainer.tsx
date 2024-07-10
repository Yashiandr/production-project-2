import { memo } from 'react';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
    const {
        className,
    } = props;

    const {
        view,
        onChangeView,
    } = useArticlesFilter();

    return (
            <ArticlesViewSelector className={className} view={view} onViewClick={onChangeView} />
    );
});
