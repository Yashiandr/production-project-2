import { RootState } from 'app/providers/StoreProvider';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
