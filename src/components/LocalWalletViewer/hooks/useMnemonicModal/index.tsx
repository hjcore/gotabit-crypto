import { Button, Textarea, Group } from '@mantine/core';
import { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import messageDispatcher, { valueRequiredError } from '@utils/messageDispatcher';
import useModal from '../../../../hooks/useModal';
import useRequestLoadingDispatcher from '../../../../hooks/useRequestLoadingDispatcher';
import useLocalWallet from '../../../../hooks/useLocalWallet';

export default function useMnemonicModal() {
  const [mnemonicWords, setMnemonicWords] = useState<string>('');
  const [workLoading, executePromiseHandler] = useRequestLoadingDispatcher();
  const { importWalletDispatcher } = useLocalWallet();

  const onMnemonicWordsChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setMnemonicWords(event.target.value);
  }, []);

  const startImportWallet = useCallback(
    (closeModal: VoidFunction) => {
      executePromiseHandler(async () => {
        if (mnemonicWords === '') {
          messageDispatcher[valueRequiredError]('mnemonic words');
          return;
        }

        // start import
        const result = await importWalletDispatcher(mnemonicWords);
        if (result) {
          // close modal
          closeModal();
        }
      });
    },
    [executePromiseHandler, importWalletDispatcher, mnemonicWords]
  );

  const mnemonicModalContentGetter = useCallback<(_closeModal: VoidFunction) => ReactNode>(
    (_closeModal: VoidFunction) => (
      <div>
        <Textarea required placeholder="eg: hello thanks case word etc..." onChange={onMnemonicWordsChange} />
        <Group position="right" mt={15}>
          <Button loading={workLoading} onClick={() => startImportWallet(_closeModal)}>
            Confirm
          </Button>
        </Group>
      </div>
    ),
    [onMnemonicWordsChange, startImportWallet, workLoading]
  );

  const {
    ModalElement: MnemonicModalElement,
    openModal,
    closeModal,
  } = useModal({
    modalContentGetter: mnemonicModalContentGetter,
    modalProps: {
      title: 'Please input your wallet mnemonic words',
      onClose: () => setMnemonicWords(''),
    },
  });

  return {
    MnemonicModalElement,
    openModal,
    closeModal,
    mnemonicWords,
  };
}
