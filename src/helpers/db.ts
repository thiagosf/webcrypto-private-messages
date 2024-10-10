import sqlite3 from 'sqlite3'
import path from 'path'
import { open, Database } from 'sqlite'

import { Message } from '@/models'

export async function openDb(): Promise<Database> {
  return open({
    filename: path.join(__dirname, '../../../../../src/database/messages.db'),
    driver: sqlite3.Database,
  })
}

export async function insertMessage(message: Message): Promise<void> {
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

  return new Promise((resolve, reject) => {
    db.run(insertSql, values, function (err: Error) {
      console.log('> err', err)

      if (err) reject(err)
      else resolve()
    })
  })
}
