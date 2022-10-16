import moment from 'moment'
import _ from 'lodash'

export const toDate = value =>
  value ? moment(value, 'YYYY-MM-DD').toDate() : null

export const toFormattedDate = value =>
  value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : '-'

export const toDatepicker = value => moment(value).format('DD/MM/YYYY')

export const toOptionsFormat = value =>
  value
    ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
    : moment().format('DD/MM/YYYY')

export const sevenTeenYearsBeforeFormat = () =>
  moment().subtract(17, 'years').endOf('year').format('DD/MM/YYYY')

export const todayFormat = () => moment().format('DD/MM/YYYY')

export const toDatetime = value => moment(value).format('DD-MM-YYYY hh:mm:ss')

export const toDatetime24 = value =>
  value ? moment(value).format('DD-MM-YYYY HH:mm:ss') : '-'

export const toTime = value => moment(value).format('HH:mm')

export const idDate = value => moment(value).format('DD-MM-YYYY')

export const fullDate = value => moment(value).format('DD MMMM YYYY')

export const ageValue = value =>
  value ? parseInt(moment().diff(value, 'years', true)) : 'Tanggal tidak valid'

export const formatTime = time => {
  if (_.isString(time)) {
    let date = new Date()
    let timeSet = time.split(':')
    date.setHours(timeSet[0], timeSet[1], 0)
    return date
  } else {
    return time
  }
}
