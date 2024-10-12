import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import list from '@/mocks/messages/list.json'

import { Message } from '@/models'
import { insertMessage } from '@/helpers/db'

export async function GET() {
  const messages = list.map(message => new Message(message))

  return NextResponse.json({ messages }, { status: 200 })
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const message = new Message({
      uuid: randomUUID(),
      senderUuid: payload.senderUuid,
      receiverUuid: payload.receiverUuid,
      receiverEncryptedMessage: payload.receiverEncryptedMessage,
      senderEncryptedMessage: payload.senderEncryptedMessage,
      createdAt: new Date().toISOString(),
    })
    await insertMessage(message)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function DELETE() {
  return NextResponse.json({}, { status: 201 })
}
