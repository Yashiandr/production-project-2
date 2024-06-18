import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DateIcon from 'shared/assets/icons/date-32-32.svg';
import ViewersIcon from 'shared/assets/icons/viewers-32-32.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon, IconColor, IconFill } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { selectArticleDetailsData } from '../../model/selectors/selectArticleDetailsData/selectArticleDetailsData';
import { selectArticleDetailsError } from '../../model/selectors/selectArticleDetailsError/selectArticleDetailsError';
import {
    selectArticleDetailsIsLoading,
} from '../../model/selectors/selectArticleDetailsIsLoading/selectArticleDetailsIsLoading';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import * as cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {
        className,
        id,
    } = props;
    const { t } = useTranslation(['article', 'translation']);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectArticleDetailsIsLoading);
    // const isLoading = true;
    const article = useAppSelector(selectArticleDetailsData);
    const error = useAppSelector(selectArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent block={block} key={block.id} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent block={block} key={block.id} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent block={block} key={block.id} />;
        default:
            return null;
        }
    }, []);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={150} />
                <Skeleton className={cls.skeleton} width="100%" height={150} />
            </>
        );
    } else if (error) {
        content = (
            <Text title={error} align={TextAlign.CENTER} theme={TextTheme.ERROR} />
        );
    } else if (!article) {
        content = (
            <Text title={t('Ошибка', { ns: 'translation' })} align={TextAlign.CENTER} theme={TextTheme.ERROR} />
        );
    } else {
        content = (
            <>
                <Avatar size={200} src={article.img} alt={article.img} className={cls.avatar} />
                <Text title={article.title} text={article.subtitle} size={TextSize.L} />
                <div className={cls.articleInfo}>
                    <Icon Svg={ViewersIcon} color={IconColor.SECONDARY} />
                    <Text text={String(article.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={DateIcon} color={IconColor.SECONDARY} fill={IconFill.STROKE} />
                    <Text text={article.createdAt} />
                </div>
                {article.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>

    );
});
