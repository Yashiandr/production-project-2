import { useState } from "react";
import * as cls from './Counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1)
    };

    return (
        <div className={cls.btn}>
            <button onClick={increment}>increment</button>
            <h1>{count}</h1>
        </div>
    )
}