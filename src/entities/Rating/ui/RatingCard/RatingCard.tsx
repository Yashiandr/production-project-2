import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonTheme, ButtonSize } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate ?? 0);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        placeholder={t('Ваш отзыв')}
                        onChange={setFeedback}
                        value={feedback}
                    />
                </>
            )}
            off={(
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        placeholder={t('Ваш отзыв')}
                        onChange={setFeedback}
                        value={feedback}
                    />
                </>
            )}
        />
    );

    const content = (
        <>
            <VStack gap="8">
                <ToggleFeatures
                    feature="isAppRedesign"
                    on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
                    off={<TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title} />}
                />
                <StarRating
                    size={40}
                    selectedStars={starsCount}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32" align="stretch">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesign"
                            on={(
                                <HStack justify="end" gap="8" max>
                                    <Button
                                        data-testid="RatingCard.Close"
                                        variant="outline"
                                        onClick={cancelHandler}
                                        size="l"
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                    <Button
                                        onClick={acceptHandler}
                                        data-testid="RatingCard.Send"
                                        size="l"
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            )}
                            off={(
                                <HStack justify="end" gap="8" max>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={cancelHandler}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        onClick={acceptHandler}
                                        data-testid="RatingCard.Send"
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        />

                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandler}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesign"
                            on={(
                                <Button onClick={acceptHandler} size="xl">
                                    {t('Отправить')}
                                </Button>
                            )}
                            off={(
                                <ButtonDeprecated onClick={acceptHandler} size={ButtonSize.XL}>
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            )}
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <Card
                    className={classNames('', {}, [className])}
                    data-testid="RatingCard"
                >
                    {content}
                </Card>
            )}
            off={(
                <CardDeprecated
                    className={classNames('', {}, [className])}
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            )}
        />

    );
});
