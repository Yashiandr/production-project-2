import { createSelector } from '@reduxjs/toolkit';
import { selectUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-us-32-32.svg?react';
import ArticlesIcon from '@/shared/assets/icons/articles-32-32.svg?react';
import MainIcon from '@/shared/assets/icons/home-32-32.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile-32-32.svg?react';
import { SidebarItemType } from '../../types/item';
import {
    getRouteMain,
    getRouteAbout,
    getRouteProfile,
    getRouteArticles,
} from '@/shared/const/router';

export const selectSidebarItems = createSelector(
    selectUserAuthData,
    (userData) => {
        const SidebarItemList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: MainIcon,
            },
            {
                path: getRouteAbout(),
                text: 'О сайте',
                Icon: AboutIcon,
            },
        ];

        if (userData) {
            SidebarItemList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return SidebarItemList;
    },
);
