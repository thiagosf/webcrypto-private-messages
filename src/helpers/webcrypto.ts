export function generateKey(): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: 'SHA-256' }
    },
    true,
    ['encrypt', 'decrypt']
  )
}

export function exportKey(publicKey: CryptoKey): Promise<JsonWebKey> {
  return window.crypto.subtle.exportKey('jwk', publicKey)
}

export function importKey(exportedKey: JsonWebKey, keyUsages: Array<KeyUsage>): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    'jwk',
    exportedKey,
    {
      name: 'RSA-OAEP',
      hash: {
        name: 'SHA-256'
      }
    },
    true,
    keyUsages
  )
}

export function encrypt(publicKey: CryptoKey, data: BufferSource): Promise<ArrayBuffer> {
  return window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    data
  )
}

export async function decrypt(privateKey: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP'
    },
    privateKey,
    data
  )

  return decrypted
}
