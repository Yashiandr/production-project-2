import { getStackArgs } from '../../types/flex';
import { getFlex } from '../getFlex/getFlex';

export function getVStack(args?: getStackArgs) {
    return getFlex({ ...args, direction: 'column' });
}
