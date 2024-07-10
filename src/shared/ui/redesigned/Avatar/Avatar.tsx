import { CSSProperties, useMemo } from 'react';
import UserIcon from '@/shared/assets/redesignIcons/Avatar.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
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
            errorFallback={<Icon Svg={UserIcon} width={size} height={size} />}
        />
    );
};
