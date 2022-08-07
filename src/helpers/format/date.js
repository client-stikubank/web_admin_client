import moment from 'moment'

export const toDate = value =>
  value ? moment(value, 'YYYY-MM-DD').toDate() : '-'

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

export const toDatetime24 = value => moment(value).format('DD-MM-YYYY HH:mm:ss')

export const idDate = value => moment(value).format('DD-MM-YYYY')

export const ageValue = value =>
  value ? parseInt(moment().diff(value, 'years', true)) : 'Tanggal tidak valid'
