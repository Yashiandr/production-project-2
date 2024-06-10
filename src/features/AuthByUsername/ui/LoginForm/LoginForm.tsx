import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import * as cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                placeholder={t('Введите юзернейм')}
                autofocus
            />
            <Input
                placeholder={t('Введите пароль')}
            />
            <Button
                className={cls.loginBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};
