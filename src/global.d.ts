import {FC, PropsWithChildren} from "react";

declare module '*.scss' {
   interface IClassNames {
      [className: string]: string
   }
   const cls:IClassNames;
   export = cls;
}

declare type ReactFCWithChildren = FC<PropsWithChildren>