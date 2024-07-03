import { createSelector } from '@reduxjs/toolkit';
import { selectUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-us-32-32.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-32-32.svg';
import MainIcon from '@/shared/assets/icons/home-32-32.svg';
import ProfileIcon from '@/shared/assets/icons/profile-32-32.svg';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../../types/item';

export const selectSidebarItems = createSelector(
    selectUserAuthData,
    (userData) => {
        const SidebarItemList: SidebarItemType[] = [
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
        ];

        if (userData) {
            SidebarItemList.push(
                {
                    path: RoutePath.profile + userData.id,
                    text: 'Профиль',
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    text: 'Статьи',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return SidebarItemList;
    },
);
