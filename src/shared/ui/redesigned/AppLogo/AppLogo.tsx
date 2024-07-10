import { memo } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import AppSvg from '../../../assets/icons/fox-icon.svg?react';
import * as cls from './AppLogo.module.scss';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const {
        className,
        size = 50,
    } = props;
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <AppSvg width={size} height={size} className={cls.appLogo} />
            <div className={cls.backgroundIcon} style={{ width: size, height: size }} />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});
