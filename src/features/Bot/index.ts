import VkBot from 'node-vk-bot-api'

export class VKBot {
  private token: string;
  private bot: VkBot;

  constructor(token?: string) {
    if (!token) {
      throw new Error('Token is required in bot constructor');
    }

    this.token = token;
    const vkBotSettings = {
      token: process.env.VK_TOKEN!
    }
    this.bot = new VkBot(vkBotSettings)

  }

  initCommands() {
    this.bot.command('/test', (ctx) => {
      ctx.reply(`${ctx.message.from_id}`)
    })
  }

  start() {
    this.initCommands()
    this.bot.startPolling((_err) => {
      console.log(`BOT: Polling has been started`);
      return {}
    });
  }
}