import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/AppDispatch/AppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { selectLoginError } from '../../model/selectors/selectLoginError/selectLoginError';
import { selectLoginIsLoading } from '../../model/selectors/selectLoginIsLoading/selectLoginIsLoading';
import { selectLoginPassword } from '../../model/selectors/selectLoginPassword/selectLoginPassword';
import { selectLoginUsername } from '../../model/selectors/selectLoginUsername/selectLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import * as cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(selectLoginUsername);
    const password = useSelector(selectLoginPassword);
    const isLoading = useSelector(selectLoginIsLoading);
    const error = useSelector(selectLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
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
        </div>
    );
});
