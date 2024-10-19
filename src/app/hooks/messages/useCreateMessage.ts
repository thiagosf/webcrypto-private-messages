import { useKeys } from '@/app/hooks/useKeys'
import { useCreateUser } from '@/app/hooks/users'
import { NewMessageDto } from '@/dtos'
import { exportKey } from '@/helpers'
import { Message } from '@/models'
import { EncryptionService, MessagesService } from '@/services'

export function useCreateMessage() {
  const { keyPair } = useKeys()
  const { createOrFindUserUuid } = useCreateUser()

  async function createMessage(payload: NewMessageDto) {
    if (!keyPair) return

    const publicKey = await exportKey(keyPair.publicKey)
    const senderUuid = await createOrFindUserUuid(publicKey)
    const newMessage = new Message({
      senderUuid,
      receiverUuid: payload.receiverUUID,
      senderEncryptedMessage: await new EncryptionService(keyPair.publicKey).encrypt(payload.message!),
      receiverEncryptedMessage: await new EncryptionService(payload.receiverPublicKey!).encrypt(payload.message!),
    })
    const messageService = new MessagesService()
    await messageService.create(newMessage)
  }

  return { createMessage }
}
