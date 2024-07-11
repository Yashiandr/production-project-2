import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import * as cls from './ArticleCodeBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;
        return (
            <div
                className={classNames(cls.ArticleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <ToggleFeatures
                    feature="isAppRedesign"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />

            </div>
        );
    },
);
