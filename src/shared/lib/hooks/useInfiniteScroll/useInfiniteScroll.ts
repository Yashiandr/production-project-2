import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollProps) {
    useEffect(() => {
        if (!callback) return () => null;
        const wrapperElement = wrapperRef?.current || null;
        const triggerElement = triggerRef.current;
        const options = {
            root: wrapperElement,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(triggerElement);

        return () => {
            if (observer) {
                // eslint-disable-next-line reactHooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [triggerRef, wrapperRef, callback]);
}
