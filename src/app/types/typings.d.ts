declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }

    const cls: IClassNames;
    export = cls;
}

declare const __IS_DEV__: boolean;