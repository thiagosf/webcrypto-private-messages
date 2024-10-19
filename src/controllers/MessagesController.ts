import { Message } from '@/models'
import { MessageRepository } from '@/repositories'

export class MessagesController {
  async listMessages(): Promise<Array<Message>> {
    try {
      return new MessageRepository().list()
    } catch (error) {
      console.error('MessagesController::listMessages[error]', error)

      return []
    }
  }

  async createMessage(message: Message): Promise<boolean> {
    try {
      return new MessageRepository().create(message)
    } catch (error) {
      console.error('MessagesController::createMessage[error]', error)

      return false
    }
  }
}
