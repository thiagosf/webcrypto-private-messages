import { ChangeEvent, useEffect, useState } from 'react'

import { useKeys } from '@/app/hooks/useKeys'

import { NewMessageDto } from '@/dtos'

import { EncryptionService } from '@/services'

import { textToEmojis } from '@/helpers'

const MAX_MESSAGE_TEXT_LENGTH = 190

type Props = {
  onSubmit: (newMessageDto: NewMessageDto) => unknown
}

export function NewMessageForm({ onSubmit }: Props) {
  const { keyPair } = useKeys()
  const [encryptedMessagePreview, setEncryptedMessagePreview] = useState('')
  const [newMessageDto, setNewMessageDto] = useState<NewMessageDto>({})

  function handleSubmit() {
    onSubmit(newMessageDto)
    setNewMessageDto({})
  }

  function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(field: keyof NewMessageDto) {
    return (event: ChangeEvent<T>): void => {
      const value = event.target.value

      setNewMessageDto({ ...newMessageDto, [field]: value })
    }
  }

  async function encryptMessage(text: string, keyPair: CryptoKeyPair): Promise<void> {
    const encryptedMessage = await new EncryptionService(keyPair.publicKey).encrypt(text)
    setEncryptedMessagePreview(encryptedMessage)
  }

  useEffect(() => {
    if (newMessageDto.message && keyPair) encryptMessage(newMessageDto.message, keyPair)
  }, [newMessageDto.message, keyPair])

  return (
    <div className="flex gap-8 p-8 bg-slate-700 rounded-md">
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">New message</h2>
          <input
            placeholder="Receiver UUID"
            className="bg-transparent border border-slate-500 rounded-sm px-4 py-2 outline-none text-lg transition-colors focus:border-highlight-500"
            value={newMessageDto.receiverUUID ?? ''}
            onChange={handleChange<HTMLInputElement>('receiverUUID')}
          />
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="Enter your secret message here..."
              className="bg-transparent border border-slate-500 rounded-sm px-4 py-2 outline-none text-2xl transition-colors focus:border-highlight-500 resize-none"
              onChange={handleChange<HTMLTextAreaElement>('message')}
              maxLength={MAX_MESSAGE_TEXT_LENGTH}
              value={newMessageDto.message || ''}
            ></textarea>
            <p>({MAX_MESSAGE_TEXT_LENGTH - (newMessageDto.message || '').length} characters missing)</p>
          </div>
          <button
            className="bg-slate-800 rounded-sm p-4 text-lg font-extrabold outline-none transition-colors hover:bg-highlight-500 hover:text-slate-800"
            onClick={handleSubmit}
          >Send</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <p className="font-extrabold">preview:</p>
        <div className="">
          {newMessageDto.message && textToEmojis(encryptedMessagePreview)}
        </div>
      </div>
    </div>
  )
}
