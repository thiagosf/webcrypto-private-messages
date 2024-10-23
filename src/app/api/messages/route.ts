import { NextResponse, NextRequest } from 'next/server'

import { MessagesController } from '@/controllers'

export async function GET(request: NextRequest) {
  try {
    const messages = await new MessagesController().listMessages({
      userUuid: request.nextUrl.searchParams.get('user_uuid') ?? undefined
    })

    return NextResponse.json({ success: true, data: messages }, { status: 200 })
  } catch (error) {
    console.error('> error to list messages', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    await new MessagesController().createMessage(payload)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('> error to create message', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE() {
  return NextResponse.json({}, { status: 201 })
}
