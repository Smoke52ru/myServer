import {getHelpMessage} from "../../messages";

export const helpMiddleware: VkBotMiddleware = async (ctx) => {
  ctx.reply(getHelpMessage());
}