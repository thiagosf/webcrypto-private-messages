import { User } from '@/models'
import { UserRepository } from '@/repositories'

export class UsersController {
  async createOrFindOne(publicKey: string): Promise<User> {
    return new UserRepository().createOrFindOne(publicKey)
  }

  async findPublicKeyByUuid(uuid: string): Promise<string> {
    return new UserRepository().findPublicKeyByUuid(uuid)
  }
}
