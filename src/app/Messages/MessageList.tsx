'use client'

import { useEffect } from 'react'

import { useCreateMessage, useKeys, useListMessages } from '@/app/hooks'
import { MessageListItem } from '@/app/Messages/MessageListItem'
import { NewMessageForm } from '@/app/Messages/NewMessageForm'
import { NewMessageDto } from '@/dtos'
import { Icon } from '@/app/components'

export function MessageList() {
  const { keyPair } = useKeys()
  const {
    loadingState,
    messages,
    decryptedMessages,
    filters,
    loadMessages,
    decryptMessages,
    setFilter,
    removeFilter
  } = useListMessages()
  const { createMessage } = useCreateMessage()

  async function handleCreateMessage(newMessage: NewMessageDto): Promise<void> {
    await createMessage(newMessage)
    await loadMessages()
  }

  function handleSelectUser(userUuid: string) {
    setFilter('userUuid', userUuid)
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
      <NewMessageForm
        receiverUUID={filters.userUuid}
        onSubmit={handleCreateMessage}
      />
      {filters.userUuid && (
        <div className="flex gap-4 items-center">
          <div>Filtering messages from/to:</div>
          <div
            className="cursor-pointer bg-slate-900 px-2 py-1 rounded-sm flex gap-2 hover:bg-slate-950"
            onClick={() => removeFilter('userUuid')}
          >
            <div>{filters.userUuid}</div>
            <Icon name="remove" />
          </div>
        </div>
      )}
      {loadingState === 'loading' && (
        <div>Loading...</div>
      )}
      <div className="flex flex-col gap-4">
        {messages.map((message) => {
          return (
            <MessageListItem
              key={message.uuid}
              message={message}
              decryptedMessage={decryptedMessages[message.uuid!] || '...'}
              selectedUser={filters.userUuid}
              onSelectUser={handleSelectUser}
            />
          )
        })}
      </div>
    </div>
  )
}
