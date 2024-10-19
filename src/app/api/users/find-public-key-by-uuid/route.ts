import { NextResponse } from 'next/server'

import { UsersController } from '@/controllers'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const publicKey = await new UsersController().findPublicKeyByUuid(payload.uuid)

    return NextResponse.json({ success: true, data: { publicKey } }, { status: 200 })
  } catch (error) {
    console.error('> error to create find public key', error)

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
