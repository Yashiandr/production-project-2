import { memo, ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ViewCardGesture.module.scss';
import { useAnimationLibs, AnimationProvider } from '../../../lib/components/AnimationProvider';

function baseClamp(number: number, lower?: number, upper?: number) {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
}

function clamp(number: number, lower?:number, upper?: number) {
    if (upper === undefined) {
        upper = lower;
        lower = undefined;
    }
    if (upper !== undefined) {
        upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
        lower = Number(lower);
        lower = lower === lower ? lower : 0;
    }
    return baseClamp(Number(number), lower, upper);
}

interface ViewCardProps {
    className?: string;
    cards: ReactNode[];
}
const width = window.innerWidth;
/**
 * @deprecated
 */
export const ViewCardContent = memo((props: ViewCardProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const { className, cards } = props;

    const index = useRef(0);

    const [springProps, api] = Spring.useSprings(cards.length, (i) => ({
        x: i * width,
        scale: 1,
        display: 'block',
    }));
    const bind = Gesture.useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (active && Math.abs(mx) > width / 2) {
            index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, cards.length - 1) ?? 0;
            cancel();
        }
        api.start((i) => {
            if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
            const x = (i - index.current) * width + (active ? mx : 0);
            const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
            return { x, scale, display: 'block' };
        });
    });
    return (
        <div className={classNames(cls.ViewCard, {}, [className])}>
            {springProps.map(({ x, display, scale }, i) => (
                <Spring.a.div className={cls.card} {...bind()} key={i} style={{ display, x }}>
                    <Spring.a.div style={{ scale }}>
                        {cards[i]}
                    </Spring.a.div>
                </Spring.a.div>
            ))}
        </div>
    );
});

const ViewCardAsync = (props: ViewCardProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <ViewCardContent {...props} />;
};

export const ViewCardGesture = (props: ViewCardProps) => (
    <AnimationProvider>
        <ViewCardAsync {...props} />
    </AnimationProvider>
);
