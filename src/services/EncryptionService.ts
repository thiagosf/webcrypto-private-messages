import { encrypt } from '@/helpers'

export class EncryptionService {
  constructor(private publicKey: CryptoKey) { }

  async encrypt(message: string): Promise<string> {
    try {
      const encrypted = await encrypt(this.publicKey, new TextEncoder().encode(message))

      return this.arrayBufferToHex(encrypted)
    } catch (error) {
      console.error(error)

      return 'invalid'
    }
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let binary = ''

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }

    return window.btoa(binary)
  }

  arrayBufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)

    return bytes
      .reduce((acc, byte) => {
        const part = byte.toString(16).padStart(2, '0')

        return acc + part
      }, '')
  }
}
