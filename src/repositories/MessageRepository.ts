import { QueryResultRow, sql } from '@vercel/postgres'

import { BaseRepository } from '@/repositories/BaseRepository'
import { Message } from '@/models'

export type MessageListParams = {
  userUuid?: string,
  maxCreatedAt?: Date
}

export type MessageListResult = {
  messages: Array<Message>,
  nextCursor: string | null
}

export class MessageRepository extends BaseRepository {
  async list(params: MessageListParams = {}): Promise<MessageListResult> {
    let rows: Array<QueryResultRow> = []
    const limit = 2
    const maxCreatedAt = params.maxCreatedAt
      ? params.maxCreatedAt.toISOString()
      : new Date(new Date().getFullYear() + 1, 0, 0).toISOString()

    if (params.userUuid) {
      const result = await sql`
        SELECT *
        FROM messages
        WHERE
          (
            sender_uuid = ${params.userUuid} OR
            receiver_uuid = ${params.userUuid}
          ) AND
          created_at <= ${maxCreatedAt}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      rows = result.rows
    } else {
      const result = await sql`
        SELECT *
        FROM messages
        WHERE
          created_at <= ${maxCreatedAt}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      rows = result.rows
    }

    const nextCursor = rows.length > 0
      ? Buffer.from(rows[rows.length - 1].created_at.toISOString()).toString('base64')
      : null

    return {
      messages: rows.map((row) => new Message({
        uuid: row.uuid,
        senderUuid: row.sender_uuid,
        receiverUuid: row.receiver_uuid,
        senderEncryptedMessage: row.sender_encrypted_message,
        receiverEncryptedMessage: row.receiver_encrypted_message,
        createdAt: row.created_at
      })),
      nextCursor
    }
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
