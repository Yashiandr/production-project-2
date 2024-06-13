declare module '*.svg' {
    import React from 'react';

    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }

    const cls: IClassNames;
    export = cls;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __STORYBOOK__: boolean;

declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T;
