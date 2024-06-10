import { FC, PropsWithChildren } from 'react';

declare type ReactFCWithChildren = FC<PropsWithChildren>;

declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T;
