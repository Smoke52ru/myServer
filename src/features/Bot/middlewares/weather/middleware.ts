import {Weather} from "../../../../modules/Weather";

export const weatherMiddleware: VkBotMiddleware = async (ctx) => {
  let message
  if (Math.random() > 0.1) {
    message = await Weather.getString()
  } else {
    message = await Weather.getFunnyString()
  }
  ctx.reply(message)
}