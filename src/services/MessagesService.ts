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
        senderEncryptedMessage: '54126bfbbe1e37953252849c978adf82e0fe40a4a7f70b2b2a195cfa5e57b4717d7b05f32b25708a7c3d3a60e7c7f5cfad6022488d4b147fb43f5f905ec3d5a8d819cf205787ccfc553b9dfee362a9967db762e35b0cbee979f3343d3e36b9dfad3c648932394cbcc26945bb7e5e69a67edd7144fb149b8ee00ae510fe36047dd237e1bd8ea21ae54e376c8fa9afd54073d3eea02fd94d778a26b21efcd7b79f3f4a2e4749748d5bb806540c4c7e10b8426920f6fb463d5e92def65e989f35744554222580cedd24641430b72bd60a5de48b0b9e5d02d81c7533109cef02b581c87ec73c53a712a6c2a4c0d5b3054ad79d01ac3cc8dada62287112600b6c9033',
        receiverEncryptedMessage: '54126bfbbe1e37953252849c978adf82e0fe40a4a7f70b2b2a195cfa5e57b4717d7b05f32b25708a7c3d3a60e7c7f5cfad6022488d4b147fb43f5f905ec3d5a8d819cf205787ccfc553b9dfee362a9967db762e35b0cbee979f3343d3e36b9dfad3c648932394cbcc26945bb7e5e69a67edd7144fb149b8ee00ae510fe36047dd237e1bd8ea21ae54e376c8fa9afd54073d3eea02fd94d778a26b21efcd7b79f3f4a2e4749748d5bb806540c4c7e10b8426920f6fb463d5e92def65e989f35744554222580cedd24641430b72bd60a5de48b0b9e5d02d81c7533109cef02b581c87ec73c53a712a6c2a4c0d5b3054ad79d01ac3cc8dada62287112600b6c9033',
        createdAt: new Date()
      }),
    ])
  }
}
