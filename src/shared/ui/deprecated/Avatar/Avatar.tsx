import { CSSProperties, useMemo } from 'react';
import defaultAvatar from '@/shared/assets/stockImage/default-man-avatar.jpg';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src = defaultAvatar,
        size = 100,
        alt = 'avatar',
    } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = <Skeleton width={size} height={size} border="50%" />;

    return (
        <AppImage
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
            src={src}
            alt={alt}
            fallback={fallback}
            errorFallback={defaultAvatar}
        />
    );
};
