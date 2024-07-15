import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleAdditionalInfoProps {
    className?: string;
    author?: User;
    createdAt?: string;
    views?: number;
    onEdit?: () => void;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const {
        className,
        author,
        createdAt,
        views,
        onEdit,
    } = props;
    const { t } = useTranslation();

    const content = (
        <>
            <HStack gap="8">
                <Avatar src={author?.avatar} size={32} />
                <Text text={author?.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Text text={t('просмотров', { count: views })} />
            <Button onClick={onEdit}>{t('Редактировать')}</Button>
        </>
    );
    return (
        <>
            <BrowserView>
                <VStack
                    gap="32"
                    align="start"
                    className={classNames('', {}, [className])}
                >
                    {content}
                </VStack>
            </BrowserView>
            <MobileView>
                <HStack
                    justify="between"
                    gap="8"
                >
                    {content}
                </HStack>
            </MobileView>
        </>
    );
});
