import {scheduleMiddleware} from "./middlewares/schedule";
import {helpCommands, helpMiddleware} from "./middlewares/help";
import {scheduleCommandsAll} from "./middlewares/schedule/commands";
import {weatherCommands, weatherMiddleware} from "./middlewares/weather";
import {keyboardCommands} from "./middlewares/keyboard";
import {keyboardMiddleware} from "./middlewares/keyboard";

enum Commands {
  Help = 'help',
  Schedule = 'schedule',
  Weather = 'weather',
  Keyboard = 'keyboard',
}

export type TCommand = {
  name: Commands,
  hint?: string,
  prefixes: string[],
  keywords: string[],
  middleware: VkBotMiddleware,
}
const defaultPrefixes = ['/', '!', '']

export const botCommandsConfig: TCommand[] =
  [
    {
      name: Commands.Help,
      hint: 'help/помощь - собственна хелпинг для заблудших)',
      prefixes: defaultPrefixes,
      keywords: helpCommands,
      middleware: helpMiddleware,
    },
    {
      name: Commands.Schedule,
      prefixes: defaultPrefixes,
      keywords: scheduleCommandsAll,
      middleware: scheduleMiddleware,
    },
    {
      name: Commands.Weather,
      prefixes: defaultPrefixes,
      keywords: weatherCommands,
      middleware: weatherMiddleware,
    },
    {
      name: Commands.Keyboard,
      hint: 'keyboard/k - клавиатура с основными командами',
      prefixes: defaultPrefixes,
      keywords: keyboardCommands,
      middleware: keyboardMiddleware,
    }
  ]
