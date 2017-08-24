import moment from 'moment'

export function getDateFromCreateDate(create_date, format = 'DD/MM/YYYY') {
  const date = moment(create_date).utc().format(format)
  return date
}

export function getDateFromNow(create_date) {
  const date = moment(create_date).fromNow();
  return date
}

