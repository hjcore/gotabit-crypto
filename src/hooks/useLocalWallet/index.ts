import { useCallback } from 'react';
import { LocalWallet } from '@gotabit/wallet-local';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalWallet } from '@store/reducers/localWalletReducer';
import { RootState } from '@store/index';
import messageDispatcher, { mnemonicWordsImportError } from '@utils/messageDispatcher';
import useRequestLoadingDispatcher from '../useRequestLoadingDispatcher';

export default function useLocalWallet() {
  const dispatch = useDispatch();
  const localWalletState = useSelector((state: RootState) => state.localWalletState);
  const [workLoading, executePromiseHandler] = useRequestLoadingDispatcher();

  const generateWalletDispacther = useCallback(async () => {
    executePromiseHandler(async () => {
      const localWalletInstance = await LocalWallet.init({
        walletGenerateLength: 12,
      });
      const accounts = await localWalletInstance.getAccounts();
      const account = accounts[0].address;
      dispatch(
        initLocalWallet({
          address: account,
          localWalletInstance,
        })
      );
    });
  }, [dispatch, executePromiseHandler]);

  const importWalletDispatcher = useCallback(
    async (mnemonicWords: string) => {
      if (mnemonicWords === '') return;
      const localWalletInstance = await LocalWallet.init({
        mnemonic: mnemonicWords,
      }).catch(() => {
        messageDispatcher[mnemonicWordsImportError]();
      });
      if (!localWalletInstance) return;
      const accounts = await localWalletInstance.getAccounts();
      const account = accounts[0].address;
      dispatch(
        initLocalWallet({
          address: account,
          localWalletInstance,
        })
      );
      return localWalletInstance;
    },
    [dispatch]
  );

  return {
    generateWalletDispacther,
    importWalletDispatcher,
    localWalletState,
    workLoading,
  };
}
