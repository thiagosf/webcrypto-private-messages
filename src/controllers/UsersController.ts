export class UsersController {
  async generateAuthCode(publicKey: string): Promise<string> {
    return `${publicKey}123`
  }

  async validateAuthCode(authCode: string, decryptedAuthCode: string): Promise<boolean> {
    return authCode === decryptedAuthCode
  }
}
