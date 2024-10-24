export function paginationCursorToDate(cursor: string): Date | undefined {
  try {
    const value = Buffer.from(cursor, 'base64').toString()
    const date = new Date(value)
    if (isNaN(Number(date))) throw new Error('Invalid Date')

    return date
  } catch {
    return undefined
  }
}
