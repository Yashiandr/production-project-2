import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>

            <div className={cls.links} />
        </div>
    );
}
