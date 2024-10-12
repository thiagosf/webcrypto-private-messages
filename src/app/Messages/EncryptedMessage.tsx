import { useState } from 'react'

import { textToEmojis } from '@/helpers'
import { Message } from '@/models'

type Props = {
  message: Message
}

export function EncryptedMessage({ message }: Props) {
  const [encryptedMessageType] = useState<'hex' | 'emoji'>('emoji')

  return (
    <div className="break-words">
      <p>
        {encryptedMessageType === 'hex' && message.receiverEncryptedMessage}
        {encryptedMessageType === 'emoji' && textToEmojis(message.receiverEncryptedMessage)}
      </p>
    </div>
  )
}
