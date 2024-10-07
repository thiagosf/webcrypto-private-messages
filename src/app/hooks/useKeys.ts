import { exportKey, generateKey, importKey } from '@/helpers'
import { useEffect, useState } from 'react'

export function useKeys() {
  const [keyPair, setKeyPair] = useState<CryptoKeyPair>()
  const [publicKey, setPublicKey] = useState<CryptoKey>()
  const [privateKey, setPrivateKey] = useState<CryptoKey>()

  useEffect(() => {
    async function load() {
      // const keyPair = await crypto.subtle.generateKey(
      //   {
      //     // name: "AES-GCM",
      //     name: "RSA-OAEP",
      //     modulusLength: 4096,
      //     publicExponent: new Uint8Array([1, 0, 1]),
      //     hash: "SHA-256"
      //   },
      //   true,
      //   ["encrypt", "decrypt"]
      // )
      // const publicKey = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
      // const privateKey = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

      // works! generating new key
      // const keyPair = await window.crypto.subtle.generateKey(
      //   {
      //     name: "AES-GCM",
      //     length: 256, //can be  128, 192, or 256
      //   },
      //   true, //whether the key is extractable (i.e. can be used in exportKey)
      //   ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
      // )
      // console.log('> keyPair', keyPair);

      // // works! exporting key
      // const exportedKey = await window.crypto.subtle.exportKey(
      //   "jwk", //can be "jwk" or "raw"
      //   keyPair //extractable must be true
      // )
      // console.log('> exportedKey', exportedKey);

      // works! importing key
      // https://gist.github.com/mpgn/2f990997b9aa5fad3f90ff94546fae1e
      // const keyPair = await window.crypto.subtle.importKey(
      //   "jwk", //can be "jwk" or "raw"
      //   {   //this is an example jwk key, "raw" would be an ArrayBuffer
      //     kty: "oct",
      //     k: "idexHVQM4xoXZbA52-J9ag7gPN9goroO_ZwMLt85MH8",
      //     alg: "A256GCM",
      //     ext: true,
      //   },
      //   {   //this is the algorithm options
      //     name: "AES-GCM",
      //   },
      //   true, //whether the key is extractable (i.e. can be used in exportKey)
      //   ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
      // )
      // console.log('> keyPair', keyPair)

      // new way: RSA-OAEP
      const loadedKeyPair = await loadKeyPair()
      console.log('> loadedKeyPair', loadedKeyPair)

      const keyPair = loadedKeyPair || await generateKey()
      console.log('> keyPair', keyPair)

      if (!loadedKeyPair) await storeKeyPair(keyPair)

      // const exportedPublicKey = await exportKey(keyPair.publicKey)
      // console.log('> exportedPublicKey', exportedPublicKey)

      // const exportedPrivateKey = await exportKey(keyPair.privateKey)
      // console.log('> exportedPrivateKey', exportedPrivateKey, JSON.stringify(exportedPrivateKey))

      // const importedPublicKey = await importKey(exportedPublicKey, ['encrypt'])
      // console.log('> importedPublicKey', importedPublicKey, JSON.stringify(importedPublicKey))

      // const importedPrivateKey = await importKey(exportedPrivateKey, ['decrypt'])
      // console.log('> importedPrivateKey', importedPrivateKey)

      setKeyPair(keyPair)
      setPublicKey(keyPair.publicKey)
      setPrivateKey(keyPair.privateKey)
    }

    load()
  }, [])

  async function storeKeyPair(keyPair: CryptoKeyPair): Promise<void> {
    const exportedPublicKey = await exportKey(keyPair.publicKey)
    const exportedPrivateKey = await exportKey(keyPair.privateKey)

    window.localStorage.setItem('keys', JSON.stringify({
      exportedPublicKey,
      exportedPrivateKey
    }))
  }

  async function loadKeyPair(): Promise<CryptoKeyPair | undefined> {
    try {
      const keys = window.localStorage.getItem('keys')
      console.log('> keys', keys)

      if (!keys) return undefined

      const parsedKeys = JSON.parse(keys) as {
        exportedPublicKey: JsonWebKey,
        exportedPrivateKey: JsonWebKey
      }
      const publicKey = await importKey(parsedKeys.exportedPublicKey, ['encrypt'])
      const privateKey = await importKey(parsedKeys.exportedPrivateKey, ['decrypt'])

      console.log('> publicKey', publicKey)
      console.log('> privateKey', privateKey)



      console.log('> parsedKeys', parsedKeys)

      return { publicKey, privateKey }
    } catch (error) {
      console.error(error)

      return undefined
    }
  }

  return { keyPair, publicKey, privateKey }
}
