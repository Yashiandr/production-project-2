/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { GridComponents } from 'react-virtuoso';
import { Article } from '../../../model/types/article';

export const virtuosoStyleSmall: GridComponents<Article> = {
    List: forwardRef(({ style, children, ...props }, ref) => (
        <div
            ref={ref}
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
                gap: '2rem .5rem',
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    )),
};
