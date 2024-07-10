import { createSelector } from '@reduxjs/toolkit';
import { selectUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/redesignIcons/Home.svg?react';
import AboutIcon from '@/shared/assets/redesignIcons/Info.svg?react';
import ProfileIcon from '@/shared/assets/redesignIcons/Avatar.svg?react';
import ArticlesIcon from '@/shared/assets/redesignIcons/Articles.svg?react';
import AboutIconDeprecated from '@/shared/assets/icons/about-us-32-32.svg?react';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles-32-32.svg?react';
import MainIconDeprecated from '@/shared/assets/icons/home-32-32.svg?react';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-32-32.svg?react';
import { SidebarItemType } from '../../types/item';
import {
    getRouteMain,
    getRouteAbout,
    getRouteProfile,
    getRouteArticles,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const selectSidebarItems = createSelector(
    selectUserAuthData,
    (userData) => {
        const SidebarItemList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: toggleFeatures({
                    name: 'isAppRedesign',
                    on: () => MainIcon,
                    off: () => MainIconDeprecated,
                }),
            },
            {
                path: getRouteAbout(),
                text: 'О сайте',
                Icon: toggleFeatures({
                    name: 'isAppRedesign',
                    on: () => AboutIcon,
                    off: () => AboutIconDeprecated,
                }),
            },
        ];

        if (userData) {
            SidebarItemList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    Icon: toggleFeatures({
                        name: 'isAppRedesign',
                        on: () => ProfileIcon,
                        off: () => ProfileIconDeprecated,
                    }),
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    Icon: toggleFeatures({
                        name: 'isAppRedesign',
                        on: () => ArticlesIcon,
                        off: () => ArticlesIconDeprecated,
                    }),
                    authOnly: true,
                },
            );
        }

        return SidebarItemList;
    },
);
