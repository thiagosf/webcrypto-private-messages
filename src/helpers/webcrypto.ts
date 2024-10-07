export function generateKey(): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048, //can be 1024, 2048, or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: 'SHA-256' }, //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'] //must be ['encrypt', 'decrypt'] or ['wrapKey', 'unwrapKey']
  )
}

export function exportKey(publicKey: CryptoKey): Promise<JsonWebKey> {
  return window.crypto.subtle.exportKey(
    'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    publicKey //can be a publicKey or privateKey, as long as extractable was true
  )
}

export function importKey(exportedKey: JsonWebKey, keyUsages: Array<KeyUsage>): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    'jwk', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
    exportedKey,
    // {   //this is an example jwk key, other key types are Uint8Array objects
    //   kty: 'RSA',
    //   e: 'AQAB',
    //   n: exportedKey,
    //   alg: 'RSA-OAEP-256',
    //   ext: true,
    // },
    {   //these are the algorithm options
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' }, //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    keyUsages //'encrypt' or 'wrapKey' for public key import or
    //'decrypt' or 'unwrapKey' for private key imports
  )
}

export function encrypt(publicKey: CryptoKey, data: BufferSource): Promise<ArrayBuffer> {
  return window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
      //label: Uint8Array([...]) //optional
    },
    publicKey, //from generateKey or importKey above
    data //ArrayBuffer of data you want to encrypt
  )
}

export async function decrypt(privateKey: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  // const arrayBuffer = new TextEncoder().encode(data)
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
      //label: Uint8Array([...]) //optional
    },
    privateKey, //from generateKey or importKey above
    data //ArrayBuffer of the data
  )

  return decrypted
}
