import { useTranslation } from 'react-i18next';
import { memo, useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { useJsonSettings, saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

interface ArticlePageGreetingProps {
    className?: string;
}

export const ArticlePageGreeting = memo((props: ArticlePageGreetingProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей')}
            text={t(
                'Здесь вы можете искать и просматривать статьи на различные темы',
            )}
        />
    );

    if (isMobile) {
        return (<Drawer isOpen={isOpen} onClose={onClose} className={className}>{text}</Drawer>);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={className}
        >
            {text}
        </Modal>
    );
});
