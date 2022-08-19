const api = require('node-vk-bot-api/lib/api');
import {UsersGetResponse} from "@vkontakte/api-schema-typescript";

export const getFullNameByUserId = async (userId: number): Promise<string | undefined> => {
  try {
    const usersList: UsersGetResponse = await api('users.get', {
      user_ids: userId,
      access_token: process.env.VK_TOKEN!,
    }).then((res: any) => res.response)

    const user = usersList[0];
    return `${user.first_name} ${user.last_name}`
  } catch (err) {
    return undefined;
  }
}
