export {
    userActions,
    userReducer,
} from './model/slice/userSlice';
export type {
    User,
    UserSchema,
} from './model/types/user';

export { selectUserAuthData } from './model/selectors/selectUserAuthData/selectUserAuthData';
export { selectUserInited } from './model/selectors/selectUserInited/selectUserInited';
