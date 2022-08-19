import {botCommandsConfig} from "../commands";

export const getHelpMessage = () => {
  const hintsBlock = botCommandsConfig
    .filter((currentCommand) => currentCommand.hint)
    .map((currentCommand) => currentCommand.hint)
    .join('\n')

  return (
    (hintsBlock && `Подсказки:\n${hintsBlock}`) +
    `\n\n` +
    `BugReport:\n ` +
    `При возникновении ошибок в работе бота пишите мне\n` +
    `vk.com/smoke52ru`
  )
}

