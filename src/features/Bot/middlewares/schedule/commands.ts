type TCommands = {
  basic: string[],
  weekdays: string[],
  today: string[],
  tomorrow: string[]
}

export const scheduleCommands: TCommands = {
  basic: ['schedule', 's', 'расписание'],
  weekdays: ['пн', 'вт', 'ср', 'чт', 'пт'],
  today: ['сегодня'],
  tomorrow: ['завтра']
}

export const scheduleCommandsAll: string[] = Object.values(scheduleCommands).flat(1)
