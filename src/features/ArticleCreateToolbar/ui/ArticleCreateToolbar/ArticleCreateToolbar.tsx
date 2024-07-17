import { useTranslation } from 'react-i18next';
import { memo, useState, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleBlock, ArticleType } from '@/entities/Article';
import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticleCreateBlock } from '../../../ArticleCreateBlock';
import { getVStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import * as cls from './ArticleCreateToolbar.module.scss';

interface ArticleCreatToolbarProps {
    className?: string;
    addBlock: (block: ArticleBlock) => void;
    addImage: (src: string) => void;
    addType: (type: ArticleType) => void;
    img?: string;
    types?: ArticleType[];
    id: string;
}

const itemsName = Object.keys(
    ArticleType,
).filter((item) => Number.isNaN(Number(item))).filter((item) => item !== 'ALL') as ArticleType[];

export const ArticleCreateToolbar = memo((props: ArticleCreatToolbarProps) => {
    const {
        className,
        addBlock,
        addImage,
        addType,
        types,
        img,
        id,
    } = props;
    const { t } = useTranslation(['articles-edit', 'articles']);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const items = itemsName.flatMap((type) => (!types?.includes(type) ? [{
        content: <Text text={t(type, { ns: 'articles' })} />,
        onClick: () => {
            addType(type);
        },
    }] : []));

    const onOpen = useCallback(() => {
        setModalIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setModalIsOpen(false);
    }, []);
    return (
        <VStack
            max
            gap="16"
            className={classNames('', {}, [className])}
        >
            <ArticleCreateBlock addBlock={addBlock} id={id} text={t('Добавить блок')} withBorder />
            <Button onClick={onOpen}>
                {img ? t('Изменить титульное изображение') : t('Добавить титульное изображение')}
            </Button>
            <Modal isOpen={modalIsOpen} onClose={onClose} className={getVStack({ gap: '16' })}>
                <Text text={t('Ссылку на изображение можно взять из интернета')} bold />
                <Input placeholder={t('Ссылка на изображение')} value={img} onChange={addImage} />
            </Modal>
            {items[0]
                ? (
                    <Dropdown
                        className={cls.addTypes}
                        variant="outline" items={items}
                        trigger={<Text align="center" text={t('Добавить тип статьи')} />}
                    />
                )
                : <Text className={cls.addedAllTypes} text={t('Добавлены все тэги')} />}
        </VStack>
    );
});
