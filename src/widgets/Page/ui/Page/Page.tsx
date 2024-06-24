import { StateSchema } from 'app/providers/StoreProvider';
import { scrollSaveActions, selectScrollSaveByPath } from 'features/ScrollSave';
import {
    LegacyRef, memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
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
    const { pathname } = useLocation();
    const scrollPosition = useAppSelector(
        (state: StateSchema) => selectScrollSaveByPath(state, pathname),
    );
    const dispatch = useAppDispatch();

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e) => {
        dispatch(scrollSaveActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.Page, { [cls.virtuoso]: false }, [className, cls[__PROJECT__]])}
        >
            {children}
            {
                onScrollEnd
                    ? (<div className={cls.trigger} ref={triggerRef as LegacyRef<HTMLDivElement> | undefined} />)
                    : null
            }
        </section>
    );
});
