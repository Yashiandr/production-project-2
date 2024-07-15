import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './MobileContentLayout.module.scss';
import { Popover } from '../../ui/redesigned/Popups';
import SearchIcon from '@/shared/assets/redesignIcons/Search.svg?react';
import { Icon } from '../../ui/redesigned/Icon';

interface MobileContentLayoutProps {
    className?: string;
    header?: ReactElement;
    popoverContent?: ReactElement;
    content: ReactElement;
    headerSticky?: boolean;
}

export const MobileContentLayout = memo((props: MobileContentLayoutProps) => {
    const {
        className,
        header,
        popoverContent,
        content,
        headerSticky,
    } = props;
    return (
        <div className={classNames(cls.MobileContentLayout, {}, [className])}>
            {header && (
                <div className={classNames(cls.header, { [cls.sticky]: headerSticky })}>
                    {header}
                </div>
            )}
            {content}
            {popoverContent && (
                <Popover
                    className={cls.popover} direction="top start"
                    trigger={<Icon Svg={SearchIcon} width={44} height={44} />}
                >
                    {popoverContent}
                </Popover>
            )}
        </div>
    );
});
