'use client'

import { QuotedMessage } from '@/app/Messages/QuotedMessage'
import { EncryptedMessage } from '@/app/Messages/EncryptedMessage'

import { Message } from '@/models'

type Props = {
  message: Message,
  decryptedMessage: string
}

export function MessageListItem({ message, decryptedMessage }: Props) {
  return (
    <div className="p-4 rounded-md bg-slate-900 flex flex-col gap-4">
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col text-xs text-slate-500">
            <div>uuid: {message.uuid}</div>
            <div>from: {message.senderUuid}</div>
            <div>to: {message.receiverUuid}</div>
            <div>date: {message.createdAt}</div>
            <div>encrypted message:</div>
          </div>
          <EncryptedMessage message={message} />
        </div>
        <QuotedMessage text={decryptedMessage} />
      </div>
    </div>
  )
}

