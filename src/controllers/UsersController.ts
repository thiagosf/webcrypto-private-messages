import { openDb } from '@/helpers/db'
import { UserRepository } from '@/repositories'

export class UsersController {
  async create(publicKey: string): Promise<string> {
    const db = await openDb()

    return new UserRepository(db).create(publicKey)
  }
}
