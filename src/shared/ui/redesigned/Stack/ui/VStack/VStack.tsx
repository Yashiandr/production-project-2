import { Flex } from '../Flex/Flex';
import { StackProps } from '../../types/flex';

export const VStack = (props: StackProps) => (
    <Flex direction="column" {...props} />
);
