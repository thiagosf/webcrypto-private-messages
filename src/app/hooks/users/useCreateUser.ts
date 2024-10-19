import { UsersService } from '@/services'

export function useCreateUser() {
  async function createOrFindUserUuid(publicKey: JsonWebKey) {
    const userService = new UsersService()
    const uuid = await userService.create(JSON.stringify(publicKey))

    return uuid
  }

  return { createOrFindUserUuid }
}
