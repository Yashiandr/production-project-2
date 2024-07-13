import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexArgs {
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    wrap?: FlexWrap;
    max?: boolean;
    fullHeight?: boolean;
}

export interface FlexProps extends DivProps, FlexArgs{
    className?: string;
    children?: ReactNode;
}

export type StackProps = Omit<FlexProps, 'direction'>;

export type StackArgs = Omit<FlexArgs, 'direction'>
