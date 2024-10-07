'use client'

import { useEffect, useState } from 'react'

import { Message } from '@/models'
import { useKeys } from '@/app/hooks/useKeys'
import { MessagesService } from '@/services'
import { MessageListItem } from '@/app/Messages/MessageListItem'

export function MessageList() {
  const { keyPair } = useKeys()
  const [messages, setMessages] = useState<Array<Message>>([])

  async function loadMessages(keyPair: CryptoKeyPair) {
    const messageService = new MessagesService(keyPair)
    const messages = await messageService.load()
    setMessages(messages)
  }

  useEffect(() => {
    if (keyPair) loadMessages(keyPair)
  }, [keyPair])

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        return (
          <MessageListItem
            key={message.uuid}
            message={message}
          />
        )
      })}
    </div>
  )
}
