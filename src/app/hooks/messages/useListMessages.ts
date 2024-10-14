import { useState } from 'react'

import { useKeys } from '@/app/hooks/useKeys'
import { Message } from '@/models'
import { DecryptionService, MessagesService } from '@/services'

type DecryptedMessages = {
  [key: string]: string
}

export function useListMessages() {
  const { keyPair } = useKeys()
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded'>('idle')
  const [messages, setMessages] = useState<Array<Message>>([])
  const [decryptedMessages, setDecryptedMessages] = useState<DecryptedMessages>({})

  async function loadMessages() {
    if (loadingState === 'loading') return

    setLoadingState('loading')
    const messageService = new MessagesService()
    const loadedMessages = await messageService.list()
    setMessages(loadedMessages)
    setLoadingState('loaded')
  }

  async function decryptMessages() {
    if (messages.length > 0 && keyPair?.privateKey) {
      setDecryptedMessages(
        (
          await Promise.all(
            messages.map(async (message) => {
              let decryptedMessage = await new DecryptionService(keyPair.privateKey).decrypt(message.senderEncryptedMessage)

              if (DecryptionService.SECRET_MESSAGE === decryptedMessage) {
                decryptedMessage = await new DecryptionService(keyPair.privateKey).decrypt(message.receiverEncryptedMessage)
              }

              return { message, decryptedMessage }
            })
          )
        ).reduce((acc, item) => {
          if (item.message.uuid) {
            acc[item.message.uuid] = item.decryptedMessage
          }

          return acc
        }, {} as DecryptedMessages)
      )
    }
  }

  return {
    messages,
    loadingState,
    decryptedMessages,
    loadMessages,
    decryptMessages
  }
}
