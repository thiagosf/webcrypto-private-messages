import { join } from 'path'
import { Database } from 'sqlite'

import { openDb } from '@/helpers/db'

let db: Database

beforeEach(async () => {
  db = await openDb()

  await db.migrate({
    migrationsPath: join(__dirname, '../database/migrations')
  })
})

afterEach(async () => {
  await db.close()
})

export function getDb() {
  return db
}
