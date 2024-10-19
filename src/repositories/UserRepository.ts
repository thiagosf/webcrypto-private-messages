import { sql } from '@vercel/postgres'
import crypto from 'node:crypto'

import { BaseRepository } from '@/repositories/BaseRepository'
import { User } from '@/models'

export class UserRepository extends BaseRepository {
  async createOrFindOne(publicKey: string): Promise<User> {
    const user = await this.findByPublicKey(publicKey)
    if (user) return user

    const uuid = crypto.randomUUID()
    await sql`
      INSERT INTO users (
        uuid,
        public_key,
        created_at
      ) VALUES (
        ${uuid},
        ${publicKey},
        ${new Date().toISOString()}
      )
    `

    const createdUser = await this.findByUuid(uuid)

    return createdUser!
  }

  async findByUuid(uuid: string): Promise<User | undefined> {
    const { rows } = await sql`SELECT * FROM users WHERE uuid = ${uuid} LIMIT 1`

    if (!rows[0]) return undefined

    return this.rowToUser(rows[0] as ConvertKeysToSnakeCase<User>)
  }

  async findByPublicKey(publicKey: string): Promise<User | undefined> {
    const { rows } = await sql`SELECT * FROM users WHERE public_key = ${publicKey} LIMIT 1`

    if (!rows[0]) return undefined

    return this.rowToUser(rows[0] as ConvertKeysToSnakeCase<User>)
  }

  rowToUser(row: ConvertKeysToSnakeCase<User>): User {
    return new User({
      uuid: row.uuid,
      publicKey: row.public_key,
      createdAt: row.created_at
    })
  }

  async findPublicKeyByUuid(uuid: string): Promise<string> {
    const user = await this.findByUuid(uuid)

    if (!user) throw new Error('User not found')

    return user.publicKey
  }
}
