export {
    userActions,
    userReducer,
} from './model/slice/userSlice';

export {
    isUserAdmin, isUserManager, selectUserRoles,
} from './model/selectors/roleSelectors/selectUserRoles/selectUserRoles';
export { selectUserAuthData } from './model/selectors/selectUserAuthData/selectUserAuthData';
export { selectUserInited } from './model/selectors/selectUserInited/selectUserInited';

export type {
    User,
    UserSchema,
} from './model/types/user';

export { UserRole } from './model/consts/consts';
