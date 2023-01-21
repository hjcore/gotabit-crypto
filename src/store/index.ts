// deps
import { configureStore } from '@reduxjs/toolkit';

// reducers
import localWalletReducer from './reducers/localWalletReducer';

const store = configureStore({
  reducer: {
    localWalletState: localWalletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
