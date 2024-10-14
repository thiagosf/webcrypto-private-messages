import { Message } from '@/models'

type ListResult = {
  success: boolean,
  data: Array<Message>
}

type CreateResult = {
  success: boolean
}

export class MessagesService {
  async list(): Promise<Array<Message>> {
    const response = await fetch('/api/messages')
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
