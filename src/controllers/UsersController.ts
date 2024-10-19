import { UserRepository } from '@/repositories'

export class UsersController {
  async create(publicKey: string): Promise<string> {
    return new UserRepository().create(publicKey)
  }
}
