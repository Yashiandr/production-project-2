import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * @deprecated
 */
export const VStack = (props: VStackProps) => (
    <Flex direction="column" {...props} />
);
