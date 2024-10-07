import { Message } from '@/models'
import { EncryptionService } from '@/services/EncryptionService'
import { DecryptionService } from '@/services/DecryptionService'
import { generateUuid } from '@/helpers'

export class MessagesService {
  constructor(
    private keyPair: CryptoKeyPair
  ) { }

  async load(): Promise<Array<Message>> {
    const senderEncryptedMessage = await new EncryptionService(this.keyPair.publicKey).encrypt('This is a great secret!')
    console.log('> senderEncryptedMessage', senderEncryptedMessage)

    const receiverEncryptedMessage = await new DecryptionService(this.keyPair.privateKey).decrypt(senderEncryptedMessage)
    console.log('> receiverEncryptedMessage', receiverEncryptedMessage)

    const receiverEncryptedMessage2 = await new DecryptionService(this.keyPair.privateKey).decrypt('29c218859ef88ee04d9bf0a3ac8f0b16278782679fd44ce94c52903c9036462363b0baa87c551b927229bedca81a84ad1b19580f4cbd5d624551a8d55ffd089634f317fac0cbc6b93911888b467a10289d6512e86e432aef2348e022439ce0ced229d67815852e44cb3b976698c04ee039caa650de4c8cabb5415bc9fb53b638c94b0a2ef3a36831b312ed73ea01a3576243d64284df6a7595b302577acaec8efd6442ebf49ecb60cda3cb45d93fce804aa8eabccb98d08ba2c3b4e89058b4a1f5ee3ff95581033cf0fc007504b4831fc2cc37268b7ebb0866ee5837b3ae3032096a8ec2fefc7959b8ba913323dd391c270c1f68896883ee87376cd9f0f32fd1')
    console.log('> receiverEncryptedMessage2', receiverEncryptedMessage2)

    return Promise.resolve([
      new Message({
        senderUuid: generateUuid(),
        receiverUuid: generateUuid(),
        senderEncryptedMessage,
        receiverEncryptedMessage,
        createdAt: new Date()
      }),
      new Message({
        senderUuid: generateUuid(),
        receiverUuid: generateUuid(),
        senderEncryptedMessage,
        receiverEncryptedMessage: receiverEncryptedMessage2,
        createdAt: new Date()
      }),
      new Message({
        senderUuid: generateUuid(),
        receiverUuid: generateUuid(),
        senderEncryptedMessage,
        receiverEncryptedMessage: receiverEncryptedMessage2,
        createdAt: new Date()
      }),
    ])
  }
}
