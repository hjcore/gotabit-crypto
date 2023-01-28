// deps
import { encrypt as _encrypt, decrypt as _decrypt, utils } from 'micro-aes-gcm';
import { useCallback, useMemo, useState } from 'react';

const key = Uint8Array.from([
  64, 196, 127, 247, 172, 2, 34, 159, 6, 241, 30, 174, 183, 229, 41, 114, 253, 122, 119, 168, 177, 243, 155, 236, 164,
  159, 98, 72, 162, 243, 224, 195,
]);

export default function useCrypto() {
  const [cipherResult, setCipherResult] = useState<Uint8Array>(Uint8Array.from([]));
  const [decryptResult, setDecryptREsult] = useState<Uint8Array>(Uint8Array.from([]));

  const pureDecryptText = useMemo<string>(() => utils.bytesToUtf8(decryptResult), [decryptResult]);
  const pureCipherText = useMemo<string>(() => {
    if (cipherResult.length > 0) return cipherResult.toString();
    return '';
  }, [cipherResult]);

  const encrypt = useCallback(async (msg: string) => {
    setDecryptREsult(Uint8Array.from([]));
    const _cipherResult = await _encrypt(key, msg);
    setCipherResult(_cipherResult);
    return _cipherResult;
  }, []);

  const decrypt = useCallback(async () => {
    const _decryptResult = await _decrypt(key, cipherResult);
    setDecryptREsult(_decryptResult);
    setCipherResult(Uint8Array.from([]));
    return _decryptResult;
  }, [cipherResult]);

  return {
    encrypt,
    decrypt,
    cipherResult,
    pureDecryptText,
    pureCipherText,
  };
}
