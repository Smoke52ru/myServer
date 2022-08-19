import VkBot from "node-vk-bot-api";
import {makeCommandArray} from "../../shared/helpers";
import {botCommandsConfig, TCommand} from "./commands";
import {errorReporterMiddleware} from "./middlewares/errorReporter";


export class MyVKBot {
  private token: string;
  private bot: VkBot;
  private readonly botCommandsConfig: TCommand[];

  constructor(token?: string) {
    if (!token) {
      throw new Error('Token is required in bot constructor');
    }

    this.token = token;
    const vkBotSettings: VkBotSettings = {
      token: process.env.VK_TOKEN!
    }
    this.bot = new VkBot(vkBotSettings);
    this.botCommandsConfig = botCommandsConfig
  }

  applyMiddlewares(middlewares: VkBotMiddleware[]) {
    console.log('Applied middlewares:')
    middlewares.forEach((middleware, index) => {
      this.bot.use(middleware);
      console.log((index + 1) + '. ' + middleware.name);
    })
    console.log()
  }

  initCommands(commands: TCommand[]) {
    commands.forEach((currentCommand) => {
      this.bot.command(makeCommandArray(currentCommand.prefixes, currentCommand.keywords), currentCommand.middleware);
    })
  }

  start() {
    this.applyMiddlewares([errorReporterMiddleware])
    this.initCommands(this.botCommandsConfig)
    this.bot.startPolling((err) => {
      if (!err) {
        console.log(`BOT: Polling has been started`);
      } else {
        console.error(`BOT: ERROR\n ${err}`);
      }
      return {}
    });
  }
}