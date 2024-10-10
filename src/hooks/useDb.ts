import { createMessagesTable } from '@/helpers'

export function useDb() {

  async function sync(): Promise<void> {
    await createMessagesTable()
  }

  return { sync }
}
