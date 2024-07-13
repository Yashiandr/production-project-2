import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleUp from '@/shared/assets/redesignIcons/CircleUp.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const {
        className,
    } = props;
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Icon
            Svg={CircleUp}
            clickable
            onClick={onClick}
            width={32}
            height={32}
            className={classNames(cls.ScrollToTopButton, {}, [className])}
        />
    );
});
