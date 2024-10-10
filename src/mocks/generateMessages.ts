import { generateUuid, importKey } from '@/helpers'

import alice from '@/mocks/keys/alice.json'
import bob from '@/mocks/keys/bob.json'
import camille from '@/mocks/keys/camille.json'

import { Message } from '@/models'

import { EncryptionService } from '@/services'

export async function generateMessages(): Promise<Array<Message>> {
  const aliceKeyPair = {
    publicKey: await importKey(alice.exportedPublicKey, ['encrypt']),
    privateKey: await importKey(alice.exportedPrivateKey, ['decrypt'])
  } as CryptoKeyPair
  const bobKeyPair = {
    publicKey: await importKey(bob.exportedPublicKey, ['encrypt']),
    privateKey: await importKey(bob.exportedPrivateKey, ['decrypt'])
  } as CryptoKeyPair
  const camilleKeyPair = {
    publicKey: await importKey(camille.exportedPublicKey, ['encrypt']),
    privateKey: await importKey(camille.exportedPrivateKey, ['decrypt'])
  } as CryptoKeyPair

  const list = [
    new Message({
      senderUuid: generateUuid(),
      receiverUuid: generateUuid(),
      senderEncryptedMessage: await new EncryptionService(aliceKeyPair.publicKey).encrypt('Hey, Bob!'),
      receiverEncryptedMessage: await new EncryptionService(bobKeyPair.publicKey).encrypt('Hey, Bob!'),
      createdAt: new Date().toISOString()
    }),
    new Message({
      senderUuid: generateUuid(),
      receiverUuid: generateUuid(),
      senderEncryptedMessage: await new EncryptionService(bobKeyPair.publicKey).encrypt('Hey, Camille!'),
      receiverEncryptedMessage: await new EncryptionService(camilleKeyPair.publicKey).encrypt('Hey, Camille!'),
      createdAt: new Date().toISOString()
    }),
    new Message({
      senderUuid: generateUuid(),
      receiverUuid: generateUuid(),
      senderEncryptedMessage: await new EncryptionService(camilleKeyPair.publicKey).encrypt('Hey, Alice!'),
      receiverEncryptedMessage: await new EncryptionService(aliceKeyPair.publicKey).encrypt('Hey, Alice!'),
      createdAt: new Date().toISOString()
    }),
  ]

  return list
}
