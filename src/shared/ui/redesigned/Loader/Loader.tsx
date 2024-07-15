import { classNames } from '../../../lib/classNames/classNames';
import './Loader.scss';
import { toggleFeatures } from '../../../lib/features';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('react-body', {}, [className, toggleFeatures({
        name: 'isAppRedesign',
        on: () => 'new',
        off: () => 'old',
    })])}
    >
        <div className="react-ball" />
        <div className="react-ellipse ellipse1" />
        <div className="react-ellipse ellipse2" />
        <div className="react-ellipse ellipse3" />
    </div>
);
