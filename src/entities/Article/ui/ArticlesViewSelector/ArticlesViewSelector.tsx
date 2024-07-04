import { memo } from 'react';
import ListIcon from '@/shared/assets/icons/list-40-40.svg?react';
import TileIcon from '@/shared/assets/icons/tile-40-40.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button,
    ButtonTheme,
} from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { ArticlesView } from '../../model/consts/consts';
import * as cls from './ArticlesViewSelector.module.scss';

interface ArticlesViewSelectorProps {
    className?: string;
    view: ArticlesView;
    onViewClick: (view: ArticlesView) => void;
}

const viewType = [
    {
        view: ArticlesView.SMALL,
        icon: TileIcon,
    },
    {
        view: ArticlesView.BIG,
        icon: ListIcon,
    },
];

export const ArticlesViewSelector = memo((props: ArticlesViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick,
    } = props;

    const onClick = (newView: ArticlesView) => () => {
        onViewClick(newView);
    };

    return (
        <HStack gap="8" className={classNames('', {}, [className])}>
            {viewType.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.selected]: viewType.view === view })}
                    />
                </Button>
            ))}
        </HStack>
    );
});
