import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FlexGap, FlexDirection, FlexAlign, FlexJustify } from '../../types/flex';
import { getFlex } from '../../lib/getFlex/getFlex';

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string;
    children?: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        ...otherProps
    } = props;

    const classes = getFlex({ justify, align, direction, gap, max });

    return (
        <div className={classNames('', {}, [classes, className])} {...otherProps}>
            {children}
        </div>
    );
};
