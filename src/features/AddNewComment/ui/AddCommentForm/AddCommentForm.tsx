import {
    memo,
    useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { selectAddCommentFormText } from '../../model/selectors/selectAddCommentFormText/selectAddCommentFormText';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import * as cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        className,
        onSendComment,
    } = props;
    const { t } = useTranslation();
    const text = useAppSelector(selectAddCommentFormText);
    // const error = useAppSelector(selectAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onSendComment, onCommentTextChange, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack justify="between" className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    onClick={onSendHandler}
                >
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>

    );
});

export default AddCommentForm;
