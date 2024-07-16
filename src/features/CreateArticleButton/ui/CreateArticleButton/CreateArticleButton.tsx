import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from '@/shared/assets/redesignIcons/Typewriter.svg?react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getRouteArticleCreate } from '@/shared/const/router';

interface CreateArticleButtonProps {
    className?: string;
}

export const CreateArticleButton = memo((props: CreateArticleButtonProps) => {
    const {
        className,
    } = props;

    const navigate = useNavigate();

    const onClick = () => {
        navigate(getRouteArticleCreate());
    };

    return (
        <Icon Svg={Typewriter} className={className} clickable onClick={onClick} />
    );
});
