import { Message } from '@/models'
import { MessageListParams, MessageListResult, MessageRepository } from '@/repositories'

export class MessagesController {
  async listMessages(params: MessageListParams = {}): Promise<MessageListResult> {
    try {
      return new MessageRepository().list(params)
    } catch (error) {
      console.error('MessagesController::listMessages[error]', error)

      return {
        messages: [],
        nextCursor: null
      }
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
