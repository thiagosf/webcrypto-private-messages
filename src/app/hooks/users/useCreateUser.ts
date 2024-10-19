import { UsersService } from '@/services'

export function useCreateUser() {
  async function createOrFindUserUuid(publicKey: string) {
    const userService = new UsersService()
    const uuid = await userService.create(JSON.stringify(publicKey))

    return uuid
  }

  return { createOrFindUserUuid }
}
