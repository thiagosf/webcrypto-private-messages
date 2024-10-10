'use client'

import { textToEmojis } from '@/helpers'
import { Message } from '@/models'

type Props = {
  message: Message,
  decryptedMessage: string
}

export function MessageListItem({ message, decryptedMessage }: Props) {
  return (
    <div className="p-4 rounded-md bg-slate-900 flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-xs text-slate-500">
        <div>uuid: {message.uuid}</div>
        <div>from: {message.senderUuid}</div>
        <div>to: {message.receiverUuid}</div>
        <div>{message.createdAt}</div>
      </div>
      <div className="break-words">
        <blockquote className="text-xl font-semibold text-slate-900 dark:text-white">
          <svg className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <p>
            {textToEmojis(message.senderEncryptedMessage)}
          </p>
          <hr className="border border-gray-800 my-4" />
          <p>
            {decryptedMessage}
          </p>
        </blockquote>
      </div>
    </div>
  )
}
