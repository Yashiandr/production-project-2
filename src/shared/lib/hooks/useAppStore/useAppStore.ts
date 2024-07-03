import { useStore } from 'react-redux';
import { AppStore } from '@/app/providers/StoreProvider';

export const useAppStore = useStore.withTypes<AppStore>();
