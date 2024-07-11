import { StackArgs } from '../../types/flex';
import { getFlex } from '../getFlex/getFlex';

export function getVStack(args?: StackArgs) {
    return getFlex({ ...args, direction: 'column' });
}
