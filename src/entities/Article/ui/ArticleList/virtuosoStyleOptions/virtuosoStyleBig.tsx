import { forwardRef } from 'react';
import { Components } from 'react-virtuoso';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticlesView } from '../../../model/consts/consts';
import { Article } from '../../../model/types/article';
import * as cls from '../ArticleList.module.scss';

export const virtuosoStyleBig: Components<Article> = {
    // eslint-disable-next-line react/prop-types
    List: forwardRef(({ children, style }, ref) => (
        <div
            data-testid="ArticleList"
            className={classNames(cls.ArticleList, {}, [cls[ArticlesView.BIG]])}
            ref={ref}
            style={style}
        >
            {children}
        </div>
    )),
};
