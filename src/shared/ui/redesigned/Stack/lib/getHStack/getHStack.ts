import { getStackArgs } from '../../types/flex';
import { getFlex } from '../getFlex/getFlex';

export function getHStack(args: getStackArgs) {
    return getFlex({ ...args, direction: 'row' });
}
