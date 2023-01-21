import { LocalWallet } from '@gotabit/wallet-local';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalWalletState {
  address: string | null;
  localWalletInstance: LocalWallet | null;
}

const initialLocalWalletState: LocalWalletState = {
  address: null,
  localWalletInstance: null,
};

const localWalletSlice = createSlice({
  name: 'localWallet',
  initialState: initialLocalWalletState,
  reducers: {
    initLocalWallet: (state, action: PayloadAction<LocalWalletState>) => {
      state.address = action.payload.address;
      state.localWalletInstance = action.payload.localWalletInstance;
    },
    removeLocalWallet: (state) => {
      state.address = null;
      state.localWalletInstance = null;
    },
  },
});

export const { initLocalWallet, removeLocalWallet } = localWalletSlice.actions;
export default localWalletSlice.reducer;
