import { NextResponse } from 'next/server'

import { MessagesService } from '@/services'

export async function GET () {
  const messages = await MessagesService.load()

  return NextResponse.json({ messages }, { status: 200 })
}

export async function POST () {
  return NextResponse.json({ message: {} }, { status: 201 })
}

export async function DELETE () {
  return NextResponse.json({}, { status: 201 })
}
