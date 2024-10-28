import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function parseDate(date: string | number): Date {
  return dayjs.utc(date).toDate()
}

export function formatDate(date: Date | string | number, format = 'YYYY-MM-DDTHH:mm:ssZ[Z]'): string {
  return dayjs.utc(date).format(format)
}
