import 'dotenv/config'
import {ExpressServer, MyVKBot} from "./features";

const PORT = parseInt(process.env.PORT!);

const server = new ExpressServer();
server.start(PORT);

const VK_TOKEN = process.env.VK_TOKEN;

const vkBot = new MyVKBot(VK_TOKEN);
vkBot.start();
