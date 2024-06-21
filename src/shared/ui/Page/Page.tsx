import {
    LegacyRef, memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from '../../lib/hooks/useInfiniteScroll/useInfiniteScroll';
import * as cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className, cls[__PROJECT__]])}>
            {children}
            <div ref={triggerRef as LegacyRef<HTMLDivElement> | undefined} />
        </section>
    );
});
