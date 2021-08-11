import moment from 'moment-timezone'
import { config } from '@shared/config'

export const datetime = {
  getStartDateTime: () => getStartDateTime().toDate(),
  getStartDateTimeRFC3339: () => getStartDateTime().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  getEndDateTime: () => getEndDateTime().toDate(),
  getEndDateTimeRFC3339: () => getEndDateTime().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  convertRFC3339ToDate: (str: string) => moment(str).toDate(),
  convertDateToRFC3339: (date: Date) => moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  now: () => moment()
}

const getStartDateTime = () => {
  const now = moment().tz(config.dateTime.openingTime.timezone)
  const baseStartTime = moment()
    .tz(config.dateTime.openingTime.timezone)
    .set(parseHHmmssFormat(config.dateTime.openingTime.start))
  if (now.isSameOrAfter(baseStartTime, 'second')) {
    return baseStartTime.startOf('second')
  }
  return baseStartTime.subtract(1, 'days').startOf('second')
}
const getEndDateTime = () => {
  const now = moment().tz(config.dateTime.openingTime.timezone)
  const baseEndTime = moment()
    .tz(config.dateTime.openingTime.timezone)
    .set(parseHHmmssFormat(config.dateTime.openingTime.end))
  if (
    now.isSameOrAfter(
      moment().tz(config.dateTime.openingTime.timezone).set(parseHHmmssFormat(config.dateTime.openingTime.start)),
      'second'
    )
  ) {
    return baseEndTime.add(1, 'days').startOf('second')
  }

  return baseEndTime.startOf('second')
}

const parseHHmmssFormat = (HHmmssStr: string) => {
  return {
    hour: Number(HHmmssStr.substr(0, 2)),
    minute: Number(HHmmssStr.substr(2, 2)),
    second: Number(HHmmssStr.substr(4, 2))
  }
}
