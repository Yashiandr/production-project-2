import { Loader } from '@/shared/ui/redesigned/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
