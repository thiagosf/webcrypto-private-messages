'use client'

import { textToEmojis } from '@/helpers'
import { Message } from '@/models'
import { useState } from 'react'

type Props = {
  message: Message,
  decryptedMessage: string
}

export function MessageListItem({ message, decryptedMessage }: Props) {
  const [encryptedMessageType] = useState<'hex' | 'emoji'>('emoji')

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
          <div className="break-words">
            <p>
              {encryptedMessageType === 'hex' && message.senderEncryptedMessage}
              {encryptedMessageType === 'emoji' && textToEmojis(message.senderEncryptedMessage)}
            </p>
          </div>
        </div>
        <div className="flex-1 flex bg-slate-800 flex-grow min-h-full items-center justify-center rounded-md p-8">
          <blockquote className="flex gap-4 text-xl text-white lg:text-3xl">
            <svg className="w-6 h-6 text-slate-400 dark:text-slate-600 mb-4 shrink-0 lg:w-8 lg:h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p>
              {decryptedMessage}
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
