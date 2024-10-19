import { sql } from '@vercel/postgres'

import { BaseRepository } from '@/repositories/BaseRepository'
import { Message } from '@/models'

export class MessageRepository extends BaseRepository {
  async list(): Promise<Array<Message>> {
    const { rows } = await sql`SELECT * FROM messages ORDER BY created_at DESC`;

    return rows.map((row) => new Message({
      uuid: row.uuid,
      senderUuid: row.sender_uuid,
      receiverUuid: row.receiver_uuid,
      senderEncryptedMessage: row.sender_encrypted_message,
      receiverEncryptedMessage: row.receiver_encrypted_message,
      createdAt: row.created_at
    }))
  }

  async create(message: Message): Promise<boolean> {
    await sql`
      INSERT INTO messages(
        uuid,
        sender_uuid,
        receiver_uuid,
        sender_encrypted_message,
        receiver_encrypted_message,
        created_at
      ) VALUES (
        ${message.uuid},
        ${message.senderUuid},
        ${message.receiverUuid},
        ${message.senderEncryptedMessage},
        ${message.receiverEncryptedMessage},
        ${message.createdAt || new Date().toISOString()}
      )
    `

    return true
  }
}
