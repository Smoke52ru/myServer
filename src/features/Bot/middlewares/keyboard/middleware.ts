import {keyboardMarkupDefault, keyboardMarkupNNGUConstructor} from "./keyboard";


export const keyboardMiddleware: VkBotMiddleware = async (ctx) => {
    try {
        const args = ctx.message.text
            .split(' ')
            .slice(1)
        if (args[0].toLowerCase() === 'ннгу') {
            const groupName = args[1]
            if (!groupName) {
                ctx.reply('Ошибка. Укажите группу.\n(/k ННГУ Название_Группы)')
            }
            ctx.reply(
                `Клавиатура обновлена.\n` +
                `ВУЗ: ННГУ.\n` +
                `Группа: ${groupName}`,
                null,
                keyboardMarkupNNGUConstructor(groupName)
            )
            return;
        }
    } catch (e) { }

    ctx.reply(
        'Клавиатура обновлена.\nВУЗ: ННГАСУ.\nГруппа: ПРИ19.19/1',
        null,
        keyboardMarkupDefault
    )
}