import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const {
        className,
    } = props;
    return (
        <VStack
            className={className}
            justify="center"
            align="center"
            max
            fullHeight
        >
            <ScrollToTopButton />
        </VStack>
    );
});
