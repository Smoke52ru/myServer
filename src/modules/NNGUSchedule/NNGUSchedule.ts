import axios from 'axios';
import {TOneDaySchedule} from "./types";

export class NNGUSchedule {

    static async getGroupIdByName(groupName: string): Promise<string> {
        const url = new URL('https://portal.unn.ru/ruzapi/search')
        url.searchParams.append('type', 'group')
        url.searchParams.append('term', groupName)
        const {data} = await axios.get(url.href)

        return data[0].id
    }

    static async getScheduleByDate(groupName: string, queryDate: string): Promise<TOneDaySchedule> {
        const groupId = await NNGUSchedule.getGroupIdByName(groupName)
        const {data} = await axios.get(
            `https://portal.unn.ru/ruzapi/schedule/group/${groupId}?start=${queryDate}&finish=${queryDate}&lng=1`
        )

        return data
    }

}