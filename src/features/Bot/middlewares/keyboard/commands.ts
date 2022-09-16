import {scheduleCommands} from "../schedule";
import {weatherCommands} from "../weather";

export const keyboardCommands: string[] = ['клавиатура', 'к', 'keyboard', 'k']

export const keyboardButtonsDefault: string[][] = [
  scheduleCommands.weekdays.filter((_, index) => (index !== 4)),
  [scheduleCommands.today[0], scheduleCommands.tomorrow[0], weatherCommands[0]],
]