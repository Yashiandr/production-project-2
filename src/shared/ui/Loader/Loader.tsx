import { classNames } from 'shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('react-body', {}, [className])}>
        <div className="react-ball" />
        <div className="react-ellipse ellipse1" />
        <div className="react-ellipse ellipse2" />
        <div className="react-ellipse ellipse3" />
    </div>
);
