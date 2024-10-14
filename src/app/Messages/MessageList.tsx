'use client'

import { useEffect } from 'react'

import { useCreateMessage, useKeys, useListMessages } from '@/app/hooks'
import { MessageListItem } from '@/app/Messages/MessageListItem'
import { NewMessageForm } from '@/app/Messages/NewMessageForm'
import { NewMessageDto } from '@/dtos'

export function MessageList() {
  const { keyPair } = useKeys()
  const { loadingState, messages, decryptedMessages, loadMessages, decryptMessages } = useListMessages()
  const { createMessage } = useCreateMessage()

  async function handleCreateMessage(newMessage: NewMessageDto): Promise<void> {
    await createMessage(newMessage)
    await loadMessages()
  }

  useEffect(() => {
    if (loadingState !== 'idle') return

    loadMessages()
  }, [loadingState])

  useEffect(() => {
    if (loadingState !== 'loaded' || !keyPair?.privateKey) return

    decryptMessages()
  }, [loadingState, keyPair])

  return (
    <div className="flex flex-col gap-4">
      <NewMessageForm onSubmit={handleCreateMessage} />
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
