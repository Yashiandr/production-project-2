import { FC, memo, PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    NON_INVERT = 'non-invert',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    readonly?: boolean;
}

export const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        readonly,
        ...otherProps
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, { [cls.readonly]: readonly }, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
