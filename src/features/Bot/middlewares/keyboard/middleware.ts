import {keyboardMarkupDefault} from "./keyboard";


export const keyboardMiddleware: VkBotMiddleware = async (ctx) => {
  ctx.reply('Клавиатура обновлена', null, keyboardMarkupDefault)
}