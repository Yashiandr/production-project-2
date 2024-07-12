import { memo, useState } from 'react';
import { classNames, Mods } from '../../../lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star-32-32.svg?react';
import * as cls from './StarRating.module.scss';
import { Icon } from '../Icon';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { ToggleFeatures, toggleFeatures } from '../../../lib/features';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames('', {}, [className])}>
            {stars.map((starNumber) => {
                const mods: Mods = {
                    [cls.hovered]: currentStarsCount >= starNumber,
                    [cls.normal]: currentStarsCount < starNumber,
                    [cls.isSelected]: isSelected,
                };
                const commonProps = {
                    className: classNames(toggleFeatures({
                        name: 'isAppRedesign',
                        on: () => cls.StarRating,
                        off: () => cls.StarRatingDeprecated,
                    }), mods, []),
                    width: size,
                    height: size,
                    Svg: StarIcon,
                    key: starNumber,
                    onClick: onClick(starNumber),
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStarsCount >= starNumber,
                };
                return (
                    <ToggleFeatures
                        feature="isAppRedesign"
                        on={(
                            <Icon
                                {...commonProps}
                            />
                        )}
                        off={(
                            <IconDeprecated
                                {...commonProps}
                            />
                        )}
                    />

                );
            })}
        </div>
    );
});
