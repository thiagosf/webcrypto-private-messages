import { NextResponse } from 'next/server'

import { MessagesController } from '@/controllers'

export async function GET() {
  try {
    const messages = await new MessagesController().listMessages()

    return NextResponse.json({ success: true, data: messages }, { status: 200 })
  } catch (error) {
    console.log('> error to list messages', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    await new MessagesController().createMessage(payload)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.log('> error to create message', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE() {
  return NextResponse.json({}, { status: 201 })
}
