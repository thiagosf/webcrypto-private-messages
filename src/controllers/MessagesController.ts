import { insertMessage, loadMessages } from '@/helpers/db'
import { Message } from '@/models'

export class MessagesController {
  async listMessages(): Promise<Array<Message>> {
    return loadMessages()
  }

  async createMessage(message: Message): Promise<boolean> {
    await insertMessage(message)

    return true
  }
}
