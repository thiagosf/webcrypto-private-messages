import { Message } from '@/models'

import list from '@/mocks/messages/list.json'

export class MessagesService {
  async load(): Promise<Array<Message>> {
    return Promise.resolve(list.map(message => new Message({ ...message })))
  }
}
