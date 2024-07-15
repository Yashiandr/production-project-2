import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
    dark?: boolean;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, border, dark } = props;

    const styles: CSSProperties = {
        width,
        minHeight: height,
        maxHeight: height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, { [cls.dark]: dark }, [className])}
            style={styles}
        />
    );
});
