export class User {
  uuid?: string
  publicKey: string
  createdAt?: string

  constructor(props: Partial<User>) {
    this.uuid = props.uuid ?? crypto.randomUUID()
    this.publicKey = props.publicKey!
    this.createdAt = props.createdAt
  }
}
