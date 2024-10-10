import { NextResponse } from 'next/server'

import list from '@/mocks/messages/list.json'

import { Message } from '@/models'

export async function GET() {
  const messages = list.map(message => new Message(message))

  return NextResponse.json({ messages }, { status: 200 })
}

export async function POST() {
  return NextResponse.json({ message: {} }, { status: 201 })
}

export async function DELETE() {
  return NextResponse.json({}, { status: 201 })
}
