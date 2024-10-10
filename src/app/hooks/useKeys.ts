import { useEffect, useState } from 'react'

import { exportKey, generateKey, importKey } from '@/helpers'

export function useKeys() {
  const [keyPair, setKeyPair] = useState<CryptoKeyPair>()
  const [publicKey, setPublicKey] = useState<CryptoKey>()
  const [privateKey, setPrivateKey] = useState<CryptoKey>()

  useEffect(() => {
    async function load() {
      const loadedKeyPair = await loadKeyPair()
      const keyPair = loadedKeyPair || await generateKey()
      if (!loadedKeyPair) await storeKeyPair(keyPair)

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
      if (!keys) return undefined

      const parsedKeys = JSON.parse(keys) as {
        exportedPublicKey: JsonWebKey,
        exportedPrivateKey: JsonWebKey
      }
      const publicKey = await importKey(parsedKeys.exportedPublicKey, ['encrypt'])
      const privateKey = await importKey(parsedKeys.exportedPrivateKey, ['decrypt'])

      return { publicKey, privateKey }
    } catch (error) {
      console.error(error)

      return undefined
    }
  }

  return { keyPair, publicKey, privateKey }
}
