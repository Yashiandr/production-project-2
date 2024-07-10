import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = memo((props: IconProps) => {
    const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props;

    const icon = (
        <Svg
            className={cls.Icon}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(cls.button, {}, [className])} onClick={props.onClick}
                style={{ width, height }}
            >
                {icon}
            </button>
        );
    }

    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            style={{ minWidth: width, minHeight: height }}
            {...otherProps}
        />
    );
});
