import { Button, Group, Text } from '@mantine/core';
import { removeLocalWallet } from '@store/reducers/localWalletReducer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useLocalWallet from '../../hooks/useLocalWallet';
import useMnemonicModal from './hooks/useMnemonicModal';

export default function LocalWalletViewer() {
  const { generateWalletDispacther, workLoading, localWalletState } = useLocalWallet();
  const { MnemonicModalElement, openModal } = useMnemonicModal();
  const dispatch = useDispatch();

  const generateWallet = useCallback(() => {
    generateWalletDispacther();
  }, [generateWalletDispacther]);

  const disconnectWallet = useCallback(() => {
    dispatch(removeLocalWallet());
  }, [dispatch]);

  return (
    <Group position="center" style={{ flexDirection: 'column' }}>
      <div>
        <Button disabled={!!localWalletState.address} loading={workLoading} onClick={generateWallet}>
          Generate Wallet
        </Button>
        <Button ml={10} disabled={!!localWalletState.address} loading={workLoading} onClick={openModal}>
          Import Wallet
        </Button>
        <Button
          ml={10}
          color="red"
          disabled={!localWalletState.address}
          loading={workLoading}
          onClick={disconnectWallet}>
          Disconnect Wallet
        </Button>
      </div>
      <Text>Present Login Address: {localWalletState.address || '-'}</Text>
      {MnemonicModalElement}
    </Group>
  );
}
