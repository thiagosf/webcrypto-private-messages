import { Message } from '@/models'
import { MessageListResult } from '@/repositories'

type ListResult = {
  success: boolean,
  data: {
    messages: Array<Message>,
    nextCursor: string | null
  }
}

type CreateResult = {
  success: boolean
}

type MessageListParams = {
  userUuid?: string,
  nextCursor?: string
}

export class MessagesService {
  async list({ userUuid, nextCursor }: MessageListParams = {}): Promise<MessageListResult> {
    const queryParams = new URLSearchParams()
    if (userUuid) queryParams.set('user_uuid', userUuid)
    if (nextCursor) queryParams.set('next_cursor', nextCursor)
    const response = await fetch('/api/messages?' + queryParams)
    const data = (await response.json()) as ListResult
    if (!data.success) throw new Error('Error to list messages')

    return data.data
  }

  async create(payload: Message): Promise<boolean> {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const data = (await response.json()) as CreateResult

    return data.success
  }
}
