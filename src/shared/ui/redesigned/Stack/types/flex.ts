import { FlexProps } from '../ui/Flex/Flex';
import { getFlexArgs } from '../lib/getFlex/getFlex';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';
export type StackProps = Omit<FlexProps, 'direction'>;
export type getStackArgs = Omit<getFlexArgs, 'direction'>
