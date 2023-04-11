import {NNGASUSchedule} from "../../../../modules";
import {scheduleCommands} from "./commands";
import {getDateStringByDeltaDays, getDateStringByWeekdayNumber} from "../../../../shared/helpers/getDateString";
import {NNGUSchedule} from "../../../../modules/NNGUSchedule";
import {TOneDaySchedule} from "../../../../modules/NNGUSchedule/types";

export const scheduleMiddleware: VkBotMiddleware = async (ctx) => {

    // NNGU Schedule
    const payload = typeof ctx.message.payload === "string"
        ? JSON.parse(ctx.message.payload)
        : ctx.message.payload
    if (payload['university'] === 'nngu') {
        const [command, ...args] = ctx.message.text.split(' ')
        const {group} = payload
        const schedule = NNGUSchedule
        let result: TOneDaySchedule

        if (scheduleCommands.today.includes(command)) {
            result = await schedule.getScheduleByDate(
                group,
                getDateStringByDeltaDays()
                    .split('.')
                    .reverse()
                    .join('.')
            )
        } else if (scheduleCommands.tomorrow.includes(command)) {
            result = await schedule.getScheduleByDate(
                group,
                getDateStringByDeltaDays(1)
                    .split('.')
                    .reverse()
                    .join('.')
            )
        } else if (scheduleCommands.weekdays.includes(command)) {
            result = await schedule.getScheduleByDate(
                group,
                getDateStringByWeekdayNumber(scheduleCommands.weekdays.indexOf(command) + 1)
                    .split('.')
                    .reverse()
                    .join('.')
            )
        } else if (args.length) {
            if (args[0].startsWith('+')) {
                let deltaDays = 0
                if (args.length && args[0].startsWith('+')) {
                    deltaDays = Number(args[0].slice(1)) || 0
                }
                result = await schedule.getScheduleByDate(
                    group,
                    getDateStringByDeltaDays(deltaDays)
                        .split('.')
                        .reverse()
                        .join('.')
                )
            } else {
                result = await schedule.getScheduleByDate(
                    group,
                    args[0]
                        .split('.')
                        .reverse()
                        .join('.')
                )
            }
        } else {
            result = await schedule.getScheduleByDate(
                group,
                getDateStringByDeltaDays()
                    .split('.')
                    .reverse()
                    .join('.')
            )
        }

        console.log(
            getDateStringByDeltaDays()
                .split('.')
                .reverse()
                .join('.')
        )
        console.log(ctx.message.payload)
        console.log(result)

        const message = [
            `${result[0].date} - ${result[0].dayOfWeekString} - ${group}`,
            ...result.map((lesson) => [
                `${lesson.beginLesson} - ${lesson.endLesson}`,
                `${lesson.discipline} (${lesson.kindOfWork})`,
                `${lesson.lecturer_title}`,
                `${lesson.auditorium} (${lesson.building})`,
                lesson.url1_description,
                lesson.url1,
                lesson.url2_description,
                lesson.url2
            ].filter((val) => !!val).join('\n'))
        ].join('\n\n')

        return ctx.reply(message)
    }

    // NNGASU Schedule
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