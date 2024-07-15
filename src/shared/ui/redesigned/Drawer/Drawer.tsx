import { memo, ReactNode, useCallback, useEffect } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import { useAnimationLibs, AnimationProvider } from '../../../lib/components/AnimationProvider';
import { Overlay } from '../Overlay';
import * as cls from './Drawer.module.scss';
import { Portal } from '../Portal';
import { toggleFeatures } from '../../../lib/features';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    direction?: 'left' | 'down',
    transparent?: boolean
}

export const DrawerContent = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose, direction = 'down', transparent } = props;
    const { Spring, Gesture } = useAnimationLibs();
    const height = window.innerHeight - 100;
    const width = window.innerWidth - 100;
    const startWidth = direction === 'down' ? 0 : -width;
    const startHeight = direction === 'down' ? height : 0;
    const [{ x, y }, api] = Spring.useSpring(() => ({ y: startHeight, x: startWidth }));

    const openDrawer = useCallback(() => {
        api.start({ y: 0, x: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: startHeight,
            x: startWidth,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    let bind;
    let styles;
    let display;

    if (direction === 'down') {
        // eslint-disable-next-line reactHooks/rules-of-hooks
        bind = Gesture.useDrag(
            ({
                 last,
                 velocity: [, vy],
                 direction: [, dy],
                 movement: [, my],
                 cancel,
             }) => {
                if (my < -70) cancel();

                if (last) {
                    if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                        close();
                    } else {
                        openDrawer();
                    }
                } else {
                    api.start({ y: my, immediate: true });
                }
            },
            {
                from: () => [0, y.get()],
                filterTaps: true,
                bounds: { top: 0 },
                rubberband: true,
            },
        );
        display = y.to((py) => (py < height ? 'block' : 'none'));
        styles = {
            display,
            bottom: `calc(-100vh + ${height - 100}px`,
            y,
        };
    } else {
        // eslint-disable-next-line reactHooks/rules-of-hooks
        bind = Gesture.useDrag(
            ({
                 last,
                 velocity: [vx],
                 direction: [dx],
                 movement: [mx],
                 cancel,
             }) => {
                console.log(mx);
                if (mx < -70) cancel();
                if (mx > 40) cancel();

                if (last) {
                    if (mx < width * 0.5 || (vx > 0.5 && dx > 0)) {
                        close();
                    } else {
                        openDrawer();
                    }
                } else {
                    api.start({ x: mx, immediate: true });
                }
            },
            {
                from: () => [0, x.get()],
                filterTaps: true,
                bounds: { left: -100 },
            },
        );
        display = x.to((px) => (px < width ? 'block' : 'none'));
        styles = {
            display,
            left: `calc(-100wh + ${width - 100}px`,
            x,
        };
    }

    const onOverlayClickHandler = () => close(1);

    if (!isOpen) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Drawer, {}, [className, cls[direction], toggleFeatures({
                name: 'isAppRedesign',
                on: () => cls.drawerNew,
                off: () => cls.drawerOld,
            })])}
            >
                <Spring.a.div
                    className={classNames(cls.sheet, { [cls.transparent]: transparent }, [className])}
                    style={styles}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
                <Overlay onClick={onOverlayClickHandler} />
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
