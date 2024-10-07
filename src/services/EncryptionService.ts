import { encrypt } from '@/helpers'

export class EncryptionService {
  constructor(private publicKey: CryptoKey) { }

  async encrypt(message: string): Promise<string> {
    try {
      // const iv = new Uint8Array([188, 185, 57, 146, 246, 194, 114, 34, 12, 80, 198, 77])

      // const encrypted = await window.crypto.subtle.encrypt(
      //   {
      //     // name: 'RSA-OAEP',
      //     name: 'AES-GCM',
      //     iv,
      //     tagLength: 128,
      //   },
      //   this.publicKey,
      //   new TextEncoder().encode(message)
      //   // Buffer.from(message)
      // )
      // console.log(encrypted);


      // // return this.arrayBufferToBase64(encrypted)
      // return this.arrayBufferToHex(encrypted)

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

    return bytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')
  }
}
