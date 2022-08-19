import {NNGASUSchedule} from "../../../../modules";
import {scheduleCommands} from "./commands";
import {getDateStringByDeltaDays, getDateStringByWeekdayNumber} from "../../../../shared/helpers/getDateString";

export const scheduleMiddleware: VkBotMiddleware = async (ctx) => {
  const [command, ...args] = ctx.message.text.split(' ')
  const schedule = new NNGASUSchedule(process.env.NNGASU_LOGIN, process.env.NNGASU_PASSWORD)
  if (scheduleCommands.today.includes(command)) {
    await schedule.getScheduleByDate(getDateStringByDeltaDays())
  } else if (scheduleCommands.tomorrow.includes(command)) {
    await schedule.getScheduleByDate(getDateStringByDeltaDays(1))
  } else if (scheduleCommands.weekdays.includes(command)) {
    await schedule.getScheduleByDate(getDateStringByWeekdayNumber(scheduleCommands.weekdays.indexOf(command) + 1))
  } else if (args.length) {
    if (args[0].startsWith('+')) {
      let deltaDays = 0
      if (args.length && args[0].startsWith('+')) {
        deltaDays = Number(args[0].slice(1)) || 0
      }
      await schedule.getScheduleByDate(getDateStringByDeltaDays(deltaDays))
    } else {
      await schedule.getScheduleByDate(args[0])
    }
  } else {
    await schedule.getScheduleByDate(getDateStringByDeltaDays())
  }

  const message = [
    schedule.schedule.date,
    ...schedule.schedule.lessons.map((lesson) => [
      lesson.time,
      lesson.subject,
      lesson.teacher,
      lesson.room,
      lesson.link
    ].filter((val) => !!val).join('\n'))
  ].join('\n\n')

  ctx.reply(message);
}