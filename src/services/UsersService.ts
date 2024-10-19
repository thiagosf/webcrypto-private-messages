type UserResult = {
  success: boolean,
  data: {
    uuid: string
  }
}

export class UsersService {
  async create(publicKey: string): Promise<string> {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        publicKey
      })
    })
    const data = (await response.json()) as UserResult
    if (!data.success) throw new Error('Error to create user')

    return data.data.uuid
  }
}
