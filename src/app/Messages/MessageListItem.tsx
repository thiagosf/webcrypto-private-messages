'use client'

import { QuotedMessage } from '@/app/Messages/QuotedMessage'
import { EncryptedMessage } from '@/app/Messages/EncryptedMessage'
import { MessageListItemValue } from '@/app/Messages/MessageListItemValue'

import { Message } from '@/models'

type Props = {
  message: Message,
  decryptedMessage: string,
  selectedUser?: string,
  onSelectUser: (userUuid: string) => void
}

export function MessageListItem({ message, decryptedMessage, selectedUser, onSelectUser }: Props) {
  function handleSelectUser(userUuid: string) {
    return () => {
      onSelectUser(userUuid)
    }
  }

  return (
    <div className="p-4 rounded-md bg-slate-900 flex flex-col gap-4">
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col text-xs text-slate-500">
            <MessageListItemValue
              label="uuid"
              value={message.uuid}
            />
            <MessageListItemValue
              label="from"
              value={message.senderUuid}
              isSelected={selectedUser === message.senderUuid}
              onValueClick={handleSelectUser(message.senderUuid)}
            />
            <MessageListItemValue
              label="to"
              value={message.receiverUuid}
              isSelected={selectedUser === message.receiverUuid}
              onValueClick={handleSelectUser(message.receiverUuid)}
            />
            <MessageListItemValue
              label="date"
              value={message.createdAt}
            />
            <br />
            <div>encrypted message:</div>
          </div>
          <EncryptedMessage message={message} />
        </div>
        <QuotedMessage text={decryptedMessage} />
      </div>
    </div>
  )
}
