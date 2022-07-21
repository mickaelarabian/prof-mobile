import { MONTHS } from "../constants/global";

export const addDuration = (numOfHours, date = new Date()) => {
  const dateCopy = new Date(date);
  dateCopy.setTime((dateCopy.getTime() + numOfHours * 60 * 60 * 1000) + 10 * 60000);
  return dateCopy;
}

export const formatdateTime = (time, isFull) => {
  const date = new Date(time)
  const month = date.getMonth()
  const year = date.getFullYear()
  const days = date.getDate()
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const unit = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${MONTHS[month].substring(0, 3)} ${days}${isFull ? ' ' + year : ''}, ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${unit}`
}

export const formatdate = (time) => {
  const date = new Date(time)
  const month = date.getMonth()
  const year = date.getFullYear()
  const days = date.getDate()
  return `${MONTHS[month].substring(0, 3)} ${days}, ${year}`
}

export const joinStrings = (item) => {
  return item.join(' ') || ''
}