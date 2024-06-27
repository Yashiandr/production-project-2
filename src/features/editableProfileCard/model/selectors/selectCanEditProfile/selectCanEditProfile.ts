import { createSelector } from '@reduxjs/toolkit';
import { selectUserAuthData } from 'entities/User';
import { selectProfileData } from '../selectProfileData/selectProfileData';

export const selectCanEditProfile = createSelector(
    selectUserAuthData,
    selectProfileData,
    (userData, profileData) => userData?.id === profileData?.id,
);
