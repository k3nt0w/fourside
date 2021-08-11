import { v4 } from 'uuid'
import { getTime, isValid, fromUnixTime } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export const generateEncodedUuid = () => Buffer.from(v4()).toString('base64')

export const calcPaginationParam = (page?: number, perPage?: number): { skip?: number; take?: number } => {
  if (page && perPage) {
    return { skip: (page - 1) * perPage, take: perPage }
  }
  return {}
}

export const datetime = {
  now: () => new Date(),
  nowUnixTimestampSec: () => Math.floor(getTime(new Date()) / 1000),
  validateStr: (str: string) => isValid(new Date(str)),
  unixTimeToDate: (unixTimestamp: number) => fromUnixTime(unixTimestamp)
}

export const uid = {
  new: () => uuidv4()
}
