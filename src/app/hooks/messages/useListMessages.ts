import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useKeys } from '@/app/hooks/useKeys'
import { Message } from '@/models'
import { DecryptionService, MessagesService } from '@/services'

type DecryptedMessages = {
  [key: string]: string
}

type Filter = 'userUuid'

type Filters = {
  userUuid: string | undefined
}

export function useListMessages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { keyPair } = useKeys()
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded'>('idle')
  const [messages, setMessages] = useState<Array<Message>>([])
  const [nextCursor, setNextCursor] = useState<string | null>()
  const [decryptedMessages, setDecryptedMessages] = useState<DecryptedMessages>({})
  const [filters, setFilters] = useState<Filters>({
    userUuid: undefined
  })

  async function loadMessages() {
    if (loadingState === 'loading') return

    setLoadingState('loading')
    const messageService = new MessagesService()
    const result = await messageService.list({
      userUuid: filters.userUuid
    })
    setMessages(result.messages)
    setNextCursor(result.nextCursor)
    setLoadingState('loaded')
  }

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

  function setFilter(filter: Filter, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === 'userUuid') {
      params.set('user', value)
      router.push(`/?${params.toString()}`)
    }
  }

  function removeFilter(filter: Filter) {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === 'userUuid') {
      params.delete('user')
      router.push(`/?${params.toString()}`)
    }
  }

  useEffect(() => {
    setFilters({
      ...filters,
      userUuid: searchParams.get('user') ?? undefined
    })
    setMessages([])
    setLoadingState('idle')
  }, [searchParams])

  return {
    messages,
    loadingState,
    decryptedMessages,
    filters,
    nextCursor,
    loadMessages,
    decryptMessages,
    setFilter,
    removeFilter
  }
}
