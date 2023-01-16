// deps
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
