// deps
import { configureStore } from '@reduxjs/toolkit';

// example
import counterSlice from './reducers/counterExample';

const store = configureStore({
  reducer: {
    counterState: counterSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
