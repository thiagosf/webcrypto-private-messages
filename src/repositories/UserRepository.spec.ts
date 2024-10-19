import { getDb } from '@/test/setup'

import { UserRepository } from './UserRepository'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository(getDb())
  })

  describe('#create', () => {
    it('creates user when it was not created before', async () => {
      const userUuid = await userRepository.create('public-key')

      const user = await userRepository.findByUuid(userUuid)
      expect(userUuid).toBeTruthy()
      expect(user.publicKey).toEqual('public-key')
    })
  })
})
