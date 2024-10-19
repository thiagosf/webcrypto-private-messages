import sqlite3 from 'sqlite3'
import path from 'path'
import { open, Database } from 'sqlite'

import { Message } from '@/models'

export async function openDb(): Promise<Database> {
  return open({
    filename: process.env.NODE_ENV === 'test'
      ? ':memory:'
      : path.join(process.cwd(), 'messages.db'),
    driver: sqlite3.Database,
  })
}

export async function loadMessages(): Promise<Array<Message>> {
  const db = await openDb()
  const selectSql = `SELECT * FROM messages ORDER BY createdAt DESC`
  const rows = await db.all(selectSql)

  return rows.map((row) => new Message({ ...row }))
}

export async function insertMessage(message: Message): Promise<unknown> {
  const db = await openDb()
  const insertSql = `INSERT INTO messages(uuid, senderUuid, receiverUuid, senderEncryptedMessage, receiverEncryptedMessage, createdAt) VALUES(?, ?, ?, ?, ?, ?)`
  const values = [
    message.uuid,
    message.senderUuid,
    message.receiverUuid,
    message.senderEncryptedMessage,
    message.receiverEncryptedMessage,
    (message.createdAt || new Date().toISOString()),
  ]

  return db.run(insertSql, values)
}
