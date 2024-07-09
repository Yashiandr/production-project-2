export { initAuthData } from './model/services/initAuthData';

export { saveJsonSettings } from './model/services/setJsonSettings';

export { userActions, userReducer } from './model/slice/userSlice';

export {
    isUserAdmin,
    isUserManager,
    selectUserRoles,
} from './model/selectors/roleSelectors/selectUserRoles/selectUserRoles';
export {
    useJsonSettings,
} from './model/selectors/selectJsonSettings/selectJsonSettings';
export { selectUserAuthData } from './model/selectors/selectUserAuthData/selectUserAuthData';
export { selectUserInited } from './model/selectors/selectUserInited/selectUserInited';

export type { User, UserSchema } from './model/types/user';

export { UserRole } from './model/consts/consts';
