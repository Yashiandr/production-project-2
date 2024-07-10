import { FC, memo, PropsWithChildren } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassName?: string;
}

export const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo(
    (props: AppLinkProps) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            activeClassName = '',
            ...otherProps
        } = props;
        return (
            <NavLink
                to={to}
                className={({ isActive }) => classNames('', { [activeClassName]: isActive }, [cls[variant], className])}
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    },
);
