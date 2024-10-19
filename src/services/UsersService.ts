type UserResult = {
  success: boolean,
  data: {
    uuid: string
  }
}

type FindPublicKeyResult = {
  success: boolean,
  data: {
    publicKey: string
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

  async findPublicKeyByUuid(uuid: string): Promise<string | undefined> {
    const response = await fetch('/api/users/find-public-key-by-uuid', {
      method: 'POST',
      body: JSON.stringify({
        uuid
      })
    })
    const data = (await response.json()) as FindPublicKeyResult
    if (!data.success) return

    return data.data.publicKey
  }
}
