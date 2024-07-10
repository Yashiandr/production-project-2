import { memo } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import AppSvg from '../../../assets/icons/fox-icon.svg?react';
import * as cls from './AppLogo.module.scss';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
}

/**
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const {
        className,
    } = props;
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <AppSvg className={cls.appLogo} />
            <div className={cls.backgroundIcon} />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});
