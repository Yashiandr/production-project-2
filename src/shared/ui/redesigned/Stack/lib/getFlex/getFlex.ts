import { FlexJustify, FlexAlign, FlexDirection, FlexGap } from '../../types/flex';
import * as cls from '../../styles/Flex.module.scss';
import { Mods, classNames } from '../../../../../lib/classNames/classNames';

export interface getFlexArgs {
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

export function getFlex(args: getFlexArgs) {
    const {
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
    } = args;
    const justifyClasses: Record<FlexJustify, string> = {
        start: cls.justifyStart,
        center: cls.justifyCenter,
        end: cls.justifyEnd,
        between: cls.justifyBetween,
    };

    const alignClasses: Record<FlexAlign, string> = {
        start: cls.alignStart,
        center: cls.alignCenter,
        end: cls.alignEnd,
        stretch: cls.alignStretch,
    };

    const directionClasses: Record<FlexDirection, string> = {
        row: cls.directionRow,
        column: cls.directionColumn,
    };

    const gapClasses: Record<FlexGap, string> = {
        4: cls.gap4,
        8: cls.gap8,
        16: cls.gap16,
        32: cls.gap32,
    };

    const mods: Mods = {
        [cls.max]: max,
    };

    const classes = [
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

     return classNames(cls.Flex, mods, classes);
}
