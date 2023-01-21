import { showNotification } from '@mantine/notifications';

export const valueRequiredError = 'valueRequiredError';
export const mnemonicWordsImportError = 'mnemonicWordsImportError';

export const errorMessageDispatcher = (errorMsg: string, title: string = 'Warning') =>
  showNotification({
    title,
    message: errorMsg,
    color: 'red',
  });

const messageDispatcher = {
  [valueRequiredError]: (field: string) => errorMessageDispatcher(`The ${field} field was required`),
  [mnemonicWordsImportError]: () => errorMessageDispatcher('The mnemonic words are not valid'),
};

export default messageDispatcher;
