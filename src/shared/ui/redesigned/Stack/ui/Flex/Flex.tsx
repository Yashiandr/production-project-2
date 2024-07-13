import { classNames } from '@/shared/lib/classNames/classNames';
import { FlexProps } from '../../types/flex';
import { getFlex } from '../../lib/getFlex/getFlex';

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        fullHeight,
        ...otherProps
    } = props;

    const classes = getFlex({ justify, align, direction, gap, max, fullHeight });

    return (
        <div className={classNames('', {}, [classes, className])} {...otherProps}>
            {children}
        </div>
    );
};
