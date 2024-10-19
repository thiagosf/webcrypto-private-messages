import { sql } from '@vercel/postgres'
import crypto from 'node:crypto'

import { BaseRepository } from '@/repositories/BaseRepository'
import { User } from '@/models'

export class UserRepository extends BaseRepository {
  async create(publicKey: string): Promise<string> {
    const uuid = crypto.randomUUID()
    await sql`
      INSERT INTO users (
        uuid,
        publicKey,
        createdAt
      ) VALUES (
        ${uuid},
        ${publicKey},
        ${new Date().toISOString()}
      )
    `

    return uuid
  }

  async findByUuid(uuid: string): Promise<User | undefined> {
    const { rows } = await sql`SELECT * FROM users WHERE uuid = ${uuid} LIMIT 1`

    if (!rows[0]) return undefined

    return new User({
      uuid: rows[0].uuid,
      publicKey: rows[0].public_key,
      createdAt: rows[0].created_at
    })
  }
}
