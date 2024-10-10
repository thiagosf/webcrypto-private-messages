/* eslint-disable-next-line */
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(
  './database/messages.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the SQlite database.')
  }
)

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS messages (
      uuid TEXT PRIMARY KEY,
      senderUuid TEXT,
      receiverUuid TEXT,
      senderEncryptedMessage TEXT,
      receiverEncryptedMessage TEXT,
      createdAt DATETIME
    )`,
    (err) => {
      if (err) {
        return console.error(err.message)
      }

      console.log('Created messages table.')
    }
  )
})
