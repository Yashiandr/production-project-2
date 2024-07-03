import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
