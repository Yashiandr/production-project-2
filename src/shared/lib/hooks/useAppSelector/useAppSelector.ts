import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/StoreProvider';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports

export const useAppSelector = useSelector.withTypes<RootState>();
