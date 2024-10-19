import { NextResponse } from 'next/server'

import { UsersController } from '@/controllers'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const userUuid = await new UsersController().create(payload.publicKey)

    return NextResponse.json({ success: true, data: { userUuid } }, { status: 200 })
  } catch (error) {
    console.log('> error to create message', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
