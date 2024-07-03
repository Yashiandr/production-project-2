import { memo } from 'react';
import ListIcon from '@/shared/assets/icons/list-40-40.svg?react';
import TileIcon from '@/shared/assets/icons/tile-40-40.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button,
    ButtonTheme,
} from '@/shared/ui/Button/Button';
import {
    Icon,
    IconFill,
} from '@/shared/ui/Icon/Icon';
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
        iconFill: IconFill.FILL,
    },
    {
        view: ArticlesView.BIG,
        icon: ListIcon,
        iconFill: IconFill.STROKE,
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
                        fill={viewType.iconFill}
                        className={classNames('', { [cls.selected]: viewType.view === view })}
                    />
                </Button>
            ))}
        </HStack>
    );
});
