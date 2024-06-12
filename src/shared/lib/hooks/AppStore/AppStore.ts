import { AppStore } from 'app/providers/StoreProvider/config/StateSchema';
import { useStore } from 'react-redux';

export const useAppStore = useStore.withTypes<AppStore>();
