import { useEffect, useState } from 'react'

import { useKeys } from '@/app/hooks'
import { useCreateUser } from '@/app/hooks/users'
import { exportKey } from '@/helpers'

export function UserUuid() {
  const { keyPair } = useKeys()
  const { createOrFindUserUuid } = useCreateUser()
  const [uuid, setUuid] = useState('Loading...')

  async function loadUserUuid() {
    const uuid = await createOrFindUserUuid(await exportKey(keyPair!.publicKey))
    if (uuid) setUuid(uuid)
  }

  useEffect(() => {
    if (keyPair?.publicKey) loadUserUuid()
  }, [keyPair])

  return (
    <div className="flex flex-col gap-4">
      <div>Your UUID:</div>
      <input
        readOnly
        className="bg-slate-900 px-4 py-3 rounded-md outline-none"
        value={uuid}
      />
    </div>
  )
}
