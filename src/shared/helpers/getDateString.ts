const msInDay = 24 * 60 * 60 * 1000

export const getDateStringByWeekdayNumber = (weekdayNumber: number): string => {
  return getDateStringByDeltaDays(weekdayNumber - new Date().getDay())
}

export const getDateStringByDeltaDays = (deltaDays: number = 0): string => {
  return new Date(
    Date.now() + deltaDays * msInDay
  ).toLocaleDateString()
}