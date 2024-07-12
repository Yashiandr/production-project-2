import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { selectLoginError } from '../../model/selectors/selectLoginError/selectLoginError';
import { selectLoginIsLoading } from '../../model/selectors/selectLoginIsLoading/selectLoginIsLoading';
import { selectLoginPassword } from '../../model/selectors/selectLoginPassword/selectLoginPassword';
import { selectLoginUsername } from '../../model/selectors/selectLoginUsername/selectLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import * as cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducer: ReducerList = {
    login: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectLoginUsername);
    const password = useAppSelector(selectLoginPassword);
    const isLoading = useAppSelector(selectLoginIsLoading);
    const error = useAppSelector(selectLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <VStack
                        gap="24"
                        align="stretch"
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text title={t('Форма Авторизации')} />
                        {error && <Text text={error} variant="error" />}

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
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                )}
                off={(
                    <VStack
                        gap="16"
                        align="stretch"
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <TextDeprecated title={t('Форма Авторизации')} />
                        {error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
                        <InputDeprecated
                            placeholder={t('Введите логин')}
                            onChange={onChangeUsername}
                            value={username}
                            autofocus
                        />
                        <InputDeprecated
                            placeholder={t('Введите пароль')}
                            onChange={onChangePassword}
                            value={password}
                            type="password"
                        />
                        <ButtonDeprecated
                            className={cls.loginBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </VStack>
                )}
            />

        </DynamicModuleLoader>
    );
});

export default LoginForm;
