export class Message {
  uuid?: string
  senderUuid: string
  receiverUuid: string
  senderEncryptedMessage: string
  receiverEncryptedMessage: string
  createdAt?: Date

  constructor (props: Partial<Message>) {
    this.uuid = props.uuid ?? crypto.randomUUID()
    this.senderUuid = props.senderUuid!
    this.receiverUuid = props.receiverUuid!
    this.senderEncryptedMessage = props.senderEncryptedMessage!
    this.receiverEncryptedMessage = props.receiverEncryptedMessage!
    this.createdAt = props.createdAt
  }
}
