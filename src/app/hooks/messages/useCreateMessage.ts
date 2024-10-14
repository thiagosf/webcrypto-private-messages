import { useKeys } from '@/app/hooks/useKeys'
import { NewMessageDto } from '@/dtos'
import { generateUuid } from '@/helpers'
import { Message } from '@/models'
import { EncryptionService, MessagesService } from '@/services'

export function useCreateMessage() {
  const { keyPair } = useKeys()

  async function createMessage(payload: NewMessageDto) {
    if (!keyPair) return

    const newMessage = new Message({
      senderUuid: generateUuid(),
      receiverUuid: payload.receiverUUID,
      senderEncryptedMessage: await new EncryptionService(keyPair.publicKey).encrypt(payload.message!),
      receiverEncryptedMessage: await new EncryptionService(keyPair.publicKey).encrypt(payload.message!),
    })
    const messageService = new MessagesService()
    const result = await messageService.create(newMessage)
    console.log('> createMessage', result, payload)
  }

  return { createMessage }
}
