import { memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import TiledIcon from '@/shared/assets/redesignIcons/Tiled.svg?react';
import ListIcon from '@/shared/assets/redesignIcons/List.svg?react';
import ListIconDeprecated from '@/shared/assets/icons/list-40-40.svg?react';
import TiledIconDeprecated from '@/shared/assets/icons/tile-40-40.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import * as cls from './ArticlesViewSelector.module.scss';
import { ArticlesView } from '@/entities/Article';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesViewSelectorProps {
    className?: string;
    view: ArticlesView;
    onViewClick: (view: ArticlesView) => void;
}

const viewType = [
    {
        view: ArticlesView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesign',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
    {
        view: ArticlesView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesign',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },

];

export const ArticlesViewSelector = memo((props: ArticlesViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticlesView) => () => {
        onViewClick(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <HStack className={classNames(cls.ArticlesViewSelector, {}, [className])}>
                    {viewType.map((viewType) => (
                        <div
                            onClick={onClick(viewType.view)}
                            className={classNames(cls.viewSelector, {
                            [cls.selected]: viewType.view === view,
                        })}
                        >
                            <Icon
                                clickable
                                onClick={onClick(viewType.view)}
                                Svg={viewType.icon}
                                width="1.125rem"
                                height="1.125rem"
                            />
                        </div>

                    ))}
                </HStack>
            )}
            off={(
                <HStack gap="8" className={classNames('', {}, [className])}>
                    {viewType.map((viewType) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                            key={viewType.view}
                        >
                            <IconDeprecated
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.selectedDeprecated]: viewType.view === view,
                                })}
                            />
                        </ButtonDeprecated>
                    ))}
                </HStack>
            )}
        />
    );
});
