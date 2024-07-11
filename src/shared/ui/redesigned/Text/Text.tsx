import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Text.module.scss';

type TextVariant = 'primary' | 'error' | 'accent';

type TextAlign = 'left' | 'right' | 'center';

type TextSize = 'm' | 's' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    'data-testid'?: string;
    bold?: boolean;
}

type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        'data-testid': dataTestId = 'Text',
        bold,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        cls[size],
    ];

    return (
        <div
            className={classNames('', { [cls.bold]: bold }, additionalClasses)}
        >
            {title && (
                <HeaderTag
                    data-testid={`${dataTestId}.Header`}
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    );
});
