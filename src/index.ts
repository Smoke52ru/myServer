import 'dotenv/config'
import {ExpressServer, VKBot} from "./features";

const PORT = parseInt(process.env.PORT!);

const server = new ExpressServer();
server.start(PORT);

const VK_TOKEN = process.env.VK_TOKEN;

const vkBot = new VKBot(VK_TOKEN);
vkBot.start();

// console.log(`All your app are belong to us on port ${PORT}`)
