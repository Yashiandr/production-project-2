import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card';
import * as cls from './Tabs.module.scss';
import { Flex } from '../Stack/ui/Flex/Flex';
import { FlexDirection } from '../Stack/types/flex';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: string;
    onTabClick: (tab: TabItem<T>) => void;
    direction?: FlexDirection;
}

export const Tabs = memo(<T extends string>(props: TabsProps<T>) => {
    const { className, tabs, value, onTabClick, direction = 'row' } = props;

    const clickHandler = useCallback(
        (tab: TabItem<T>) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <Flex align="start" direction={direction} gap="8" className={classNames('', {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    padding="16"
                    className={cls.tabItem}
                    variant={
                        tab.value === value
                            ? 'light'
                            : 'normal'
                    }
                    key={tab.value}
                    onClick={clickHandler(tab)}
                    border="round"
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
});
