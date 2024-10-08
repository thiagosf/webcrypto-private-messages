'use client'

import { useEffect, useState } from 'react'

import { Message } from '@/models'
import { useKeys } from '@/app/hooks/useKeys'
import { DecryptionService, MessagesService } from '@/services'
import { MessageListItem } from '@/app/Messages/MessageListItem'

type DecryptedMessages = { [key: string]: string }

export function MessageList() {
  const { keyPair } = useKeys()
  const [messages, setMessages] = useState<Array<Message>>([])
  const [decryptedMessages, setDecryptedMessages] = useState<DecryptedMessages>({})

  async function loadMessages(keyPair: CryptoKeyPair) {
    const messageService = new MessagesService(keyPair)
    const messages = await messageService.load()
    setMessages(messages)
  }

  useEffect(() => {
    if (keyPair) loadMessages(keyPair)
  }, [keyPair])

  useEffect(() => {
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

    decryptMessages()
  }, [messages, keyPair])

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        return (
          <MessageListItem
            key={message.uuid}
            message={message}
            decryptedMessage={decryptedMessages[message.uuid!] || '...'}
          />
        )
      })}
    </div>
  )
}
