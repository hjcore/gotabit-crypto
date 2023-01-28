import { Group, Textarea, Text, Button } from '@mantine/core';
import { ChangeEventHandler, useCallback, useState } from 'react';
import useCrypto from '../../hooks/useCrypto';

export default function CryptoViewer() {
  const { encrypt, decrypt, pureDecryptText, pureCipherText } = useCrypto();

  const [textValue, setTextValue] = useState<string>('');

  const onTextValueChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setTextValue(event.target.value);
  }, []);

  const startEncrypt = useCallback(() => {
    encrypt(textValue);
  }, [encrypt, textValue]);

  const startDecrypt = useCallback(() => {
    decrypt();
  }, [decrypt]);

  return (
    <Group position="center">
      <Text>Write something and try to encrypto them or decrypto them</Text>
      <Textarea onChange={onTextValueChange} w="100%" />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button onClick={startEncrypt} color="green">
          Encrypto
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Text align="left" w="auto">
          {pureDecryptText ? 'Decrypt' : 'Encrypt'} Result: {pureDecryptText || pureCipherText || '-'}
        </Text>
        <Group position="right" mt={10}>
          <Button disabled={pureCipherText === ''} onClick={startDecrypt} color="red">
            Decrypto
          </Button>
        </Group>
      </div>
    </Group>
  );
}
