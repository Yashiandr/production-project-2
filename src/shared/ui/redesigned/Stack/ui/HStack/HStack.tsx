import { Flex } from '../Flex/Flex';
import { StackProps } from '../../types/flex';

export const HStack = (props: StackProps) => (
    <Flex direction="row" {...props} />
);
