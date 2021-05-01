import moment from 'moment';

export function formatDate(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
}