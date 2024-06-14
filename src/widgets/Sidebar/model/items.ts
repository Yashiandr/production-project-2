import AboutIcon from 'shared/assets/icons/about-us-32-32.svg';
import MainIcon from 'shared/assets/icons/home-32-32.svg';
import ProfileIcon from 'shared/assets/icons/profile-32-32.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemType } from './types/item';

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Главная',
        Icon: MainIcon,
    },
    {
        path: RoutePath.about,
        text: 'О сайте',
        Icon: AboutIcon,
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
];
