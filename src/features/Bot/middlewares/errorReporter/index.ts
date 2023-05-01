import {getFullNameByUserId} from "../../functions";

export const errorReporterMiddleware: VkBotMiddleware = async (ctx, next) => {
  try {
    if (next) await next();
  } catch (err) {
    const userMessage = ctx.message.text;
    const userId = ctx.message.from_id;
    const userFullName = await getFullNameByUserId(userId);

    const reportMessage = (
      `Сообщение:\n` +
      `"${userMessage}"\n` +
      `от пользователя с id = ${userId}`+
      (userFullName ? `(${userFullName})\n` : '') +
      `вызвало ошибку: \n` +
      `${err}`
    )

    const userReportMessage = (
      `Упс... Произошла ошибка...\n` +
      `Разработчик уже оповещен и скоро всё поправит)\n` +
      `Извините за неудобства)`
    )

    console.log(err)

    await ctx.bot.sendMessage(process.env.VK_ADMIN_ID!, reportMessage)
    await ctx.reply(userReportMessage)
  }
}
