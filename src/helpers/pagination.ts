type PaginationCursor = {
  date?: Date,
  lastUuid?: string
}

export function parseCursor(cursor: string): PaginationCursor {
  try {
    const value = Buffer.from(cursor, 'base64').toString()
    const [rawDate, lastUuid] = value.split('|')
    const date = new Date(rawDate)
    if (isNaN(Number(date))) throw new Error('Invalid Date')

    return { date, lastUuid }
  } catch {
    return {}
  }
}

export function buildCursor(createdAt: Date, uuid: string): string {
  return Buffer.from(
    createdAt.toISOString() +
    '|' +
    uuid
  ).toString('base64')
}
