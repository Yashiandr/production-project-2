import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, getHStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { selectAddCommentFormText } from '../../model/selectors/selectAddCommentFormText/selectAddCommentFormText';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import * as cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const text = useAppSelector(selectAddCommentFormText);
    // const error = useAppSelector(selectAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onSendComment, onCommentTextChange, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <Card
                        data-testid="AddCommentForm"
                        padding="24"
                        border="round"
                        className={classNames(cls.AddCommentForm, {}, [
                            className,
                            getHStack({
                                justify: 'between',
                                gap: '16',
                            }),
                        ])}
                    >
                        <Input
                            data-testid="AddCommentForm.Input"
                            className={cls.input}
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            onChange={onCommentTextChange}
                        />
                        <Button
                            data-testid="AddCommentForm.Button"
                            onClick={onSendHandler}
                        >
                            {t('Отправить')}
                        </Button>
                    </Card>
                  )}
                off={(
                    <HStack
                        data-testid="AddCommentForm"
                        justify="between"
                        className={classNames(cls.AddCommentFormDeprecated, {}, [className])}
                    >
                        <InputDeprecated
                            data-testid="AddCommentForm.Input"
                            className={cls.input}
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            onChange={onCommentTextChange}
                        />
                        <ButtonDeprecated
                            data-testid="AddCommentForm.Button"
                            onClick={onSendHandler}
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                )}
            />

        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
