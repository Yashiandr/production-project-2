import { forwardRef } from 'react';
import { Components } from 'react-virtuoso';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticlesView } from '../../../model/types/article';
import * as cls from '../ArticleList.module.scss';

export const virtuosoStyleBig: Components<Article> = {
    // eslint-disable-next-line react/prop-types
    List: forwardRef(({ children, style }, ref) => (
        <div
            className={classNames(cls.ArticleList, {}, [cls[ArticlesView.BIG]])}
            ref={ref}
            style={style}
        >
            {children}
        </div>
    )),
};
