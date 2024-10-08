import { decrypt } from '@/helpers'

export class DecryptionService {
  static SECRET_MESSAGE = 'You are not allowed to read it 🔒.'

  constructor(private privateKey: CryptoKey) { }

  async decrypt(message: string): Promise<string> {
    try {
      const encryptedArrayBuffer = this.hexToArrayBuffer(message)
      const decrypted = await decrypt(this.privateKey, encryptedArrayBuffer)

      return Buffer.from(decrypted).toString()
    } catch {
      return DecryptionService.SECRET_MESSAGE
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
