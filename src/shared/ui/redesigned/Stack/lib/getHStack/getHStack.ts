import { StackArgs } from '../../types/flex';
import { getFlex } from '../getFlex/getFlex';

export function getHStack(args?: StackArgs) {
    return getFlex({ ...args, direction: 'row' });
}
