import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { selectLoginError } from '../../model/selectors/selectLoginError/selectLoginError';
import { selectLoginIsLoading } from '../../model/selectors/selectLoginIsLoading/selectLoginIsLoading';
import { selectLoginPassword } from '../../model/selectors/selectLoginPassword/selectLoginPassword';
import { selectLoginUsername } from '../../model/selectors/selectLoginUsername/selectLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import * as cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducer: ReducerList = {
    login: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
        onSuccess,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectLoginUsername);
    const password = useAppSelector(selectLoginPassword);
    const isLoading = useAppSelector(selectLoginIsLoading);
    const error = useAppSelector(selectLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <VStack gap="16" align="stretch" className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма Авторизации')} />
                {error && <Text text={error} theme={TextTheme.ERROR} />}
                <Input
                    placeholder={t('Введите логин')}
                    onChange={onChangeUsername}
                    value={username}
                    autofocus
                />
                <Input
                    placeholder={t('Введите пароль')}
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                />
                <Button
                    className={cls.loginBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </VStack>
        </DynamicModuleLoader>

    );
});

export default LoginForm;
