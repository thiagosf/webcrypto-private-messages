import { UsersController } from './UsersController'

describe('UsersController', () => {
  describe('#generateAuthCode', () => {
    it('is true', async () => {
      const authCode = await new UsersController().generateAuthCode('123')

      expect(authCode).toBeTruthy()
    })
  })

  describe('#validateAuthCode', () => {
    it('is true', async () => {
      const authCode = await new UsersController().generateAuthCode('123')
      const isValid = await new UsersController().validateAuthCode(authCode, '123123')

      expect(isValid).toBeTruthy()
    })
  })
})
