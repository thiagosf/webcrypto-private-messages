import { UsersService } from '@/services'

export function useFindUserPublicKey() {
  async function findPublicKey(uuid: string) {
    const userService = new UsersService()
    const publicKey = await userService.findPublicKeyByUuid(uuid)

    return publicKey
  }

  return { findPublicKey }
}
