import { Message } from '@/models'

import list from '@/mocks/messages/list.json'
import { NewMessageDto } from '@/dtos'

export class MessagesService {
  async load(): Promise<Array<Message>> {
    return Promise.resolve(list.map(message => new Message({ ...message })))
  }

  async create(payload: NewMessageDto): Promise<void> {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    console.log(data)
  }
}
