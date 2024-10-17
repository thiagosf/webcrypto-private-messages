import { NextResponse } from 'next/server'

import { UsersController } from '@/controllers'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const authCode = await new UsersController().generateAuthCode(payload.publicKey)

    return NextResponse.json({ success: true, data: { authCode } }, { status: 200 })
  } catch (error) {
    console.log('> error to create message', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
