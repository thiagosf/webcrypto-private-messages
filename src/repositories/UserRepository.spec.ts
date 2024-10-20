import { UserRepository } from './UserRepository'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
  })

  describe.skip('#create', () => {
    it('creates user when it was not created before', async () => {
      const userUuid = await userRepository.create('public-key')

      const user = await userRepository.findByUuid(userUuid)
      expect(userUuid).toBeTruthy()
      expect(user?.publicKey).toEqual('public-key')
    })

    it('throws an error when public key is not unique', async () => {
      await userRepository.create('public-key')

      await expect(() => userRepository.create('public-key')).rejects.toThrow()
    })
  })
})
