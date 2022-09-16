import Markup from "node-vk-bot-api/lib/markup";
import {keyboardButtonsDefault} from "./commands";
import {scheduleCommands} from "../schedule";
import {weatherCommands} from "../weather";

const secondaryButtons = [scheduleCommands.weekdays[5], weatherCommands[0]]

export const keyboardMarkupDefault: VkBotKeyboard = Markup.keyboard(
  keyboardButtonsDefault.map((row) => {
    return row.map((button) => {
      const color: VkBotButton['color'] = secondaryButtons.includes(button) ? 'secondary' : 'primary'
      return Markup.button(button, color)
    })
  })
)