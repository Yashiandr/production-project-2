/* eslint-disable i18next/no-literal-string */

import { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import * as cls from './BugButton.module.scss';

interface BugButtonProps {
    className?: string;
}

// Тестовый компонент
export const BugButton = ({ className }: BugButtonProps) => {
    const [error, setError] = useState(false);

    const onThrow = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            className={classNames(cls.BugButton, {}, [className])}
            onClick={onThrow}
        >
            throw error
        </Button>
    );
};
