import { decrypt } from '@/helpers'

export class DecryptionService {
  constructor(private privateKey: CryptoKey) { }

  async decrypt(message: string): Promise<string> {
    try {
      // const iv = new Uint8Array([188, 185, 57, 146, 246, 194, 114, 34, 12, 80, 198, 77])
      // // const encryptedArrayBuffer = this.base64ToArrayBuffer(message)
      // const encryptedArrayBuffer = this.hexToArrayBuffer(message)
      // const decrypted = await window.crypto.subtle.decrypt(
      //   {
      //     // name: 'RSA-OAEP',
      //     name: 'AES-GCM',
      //     iv,
      //     tagLength: 128,
      //   },
      //   this.privateKey,
      //   encryptedArrayBuffer
      // )

      // return Buffer.from(decrypted).toString()

      const encryptedArrayBuffer = this.hexToArrayBuffer(message)
      const decrypted = await decrypt(this.privateKey, encryptedArrayBuffer)

      return Buffer.from(decrypted).toString()
    } catch (error) {
      console.error(error)

      return 'invalid'
    }
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return bytes.buffer
  }

  hexToArrayBuffer(hex: string): ArrayBuffer {
    const length = hex.length / 2
    const bytes = new Uint8Array(length)

    for (let i = 0; i < length; i++) {
      bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
    }

    return bytes.buffer
  }
}
