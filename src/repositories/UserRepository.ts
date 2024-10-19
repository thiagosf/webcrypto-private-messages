import crypto from 'node:crypto'

import { BaseRepository } from '@/repositories/BaseRepository'

export class UserRepository extends BaseRepository {
  async create(publicKey: string): Promise<string> {
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO users (uuid, publicKey, createdAt) VALUES (?, ?, ?)`
    const values = [uuid, publicKey, new Date().toISOString()]
    await this.db.run(sql, values)

    return uuid
  }

  async findByUuid(uuid: string) {
    const sql = `SELECT * FROM users WHERE uuid = ?`
    const result = await this.db.get(sql, [uuid])

    return result
  }
}
