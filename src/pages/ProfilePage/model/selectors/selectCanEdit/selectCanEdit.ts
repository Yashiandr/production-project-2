import { createSelector } from '@reduxjs/toolkit';
import { selectProfileData } from 'entities/Profile/model/selectors/selectProfileData/selectProfileData';
import { selectUserAuthData } from 'entities/User';

export const selectCanEdit = createSelector(
    selectUserAuthData,
    selectProfileData,
    (userData, profileData) => userData?.id === profileData?.id,
);
