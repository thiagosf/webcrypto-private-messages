'use client'

import { useEffect, useState } from 'react'

import { useKeys } from '@/app/hooks/useKeys'
import { MessageListItem } from '@/app/Messages/MessageListItem'

import { Message } from '@/models'

import { DecryptionService, MessagesService } from '@/services'
import { NewMessageForm } from '@/app/Messages/NewMessageForm'
import { NewMessageDto } from '@/dtos'

type DecryptedMessages = { [key: string]: string }

export function MessageList() {
  const { keyPair } = useKeys()
  const [messages, setMessages] = useState<Array<Message>>([])
  const [decryptedMessages, setDecryptedMessages] = useState<DecryptedMessages>({})

  async function loadMessages() {
    const messageService = new MessagesService()
    const messages = await messageService.load()
    setMessages(messages)
  }

  async function handleSubmit(payload: NewMessageDto) {
    console.log('> handleSubmit', payload)
  }

  useEffect(() => {
    loadMessages()
  }, [])

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
      <NewMessageForm onSubmit={handleSubmit} />
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
    </div>
  )
}
