import axios from 'axios';
import {HTMLElement, parse} from 'node-html-parser';
import {get_jhash} from "./utils";
import {CookieJar} from "tough-cookie";
import got from "got";

// TODO раскидать по файлам

type TLesson = {
  time: string;
  subject: string;
  subgroup?: string;
  teacher: string;
  room: string;
  link?: string;
  note?: string;
}

interface TScheduleDay {
  date: string;
  lessons: TLesson[]
}

const parseTextCell = (td: HTMLElement): string | undefined => {
  return (td.innerText.trim() || undefined);
}

const parseLink = (td: HTMLElement): string | undefined => {
  const linkNode = td.querySelector('a')
  if (linkNode) {
    return linkNode.rawAttributes.href
  }
  return undefined
}

const parseLesson = (tr: HTMLElement): TLesson => {
  const cells = tr.querySelectorAll('td')
  return {
    time: parseTextCell(cells[0])
      .replace(new RegExp('&ndash;', 'g'), ' - '),
    subject: parseTextCell(cells[1]),
    subgroup: parseTextCell(cells[2]),
    teacher: parseTextCell(cells[3]),
    room: parseTextCell(cells[4]),
    link: parseLink(cells[5]),
    note: parseTextCell(cells[6])
  }
}

export class NNGASUSchedule {
  private login: string;
  private password: string;
  public schedule: TScheduleDay;
  private cookieJar;

  constructor(login: string, password: string) {
    this.login = login
    this.password = password
    this.cookieJar = new CookieJar()
  }

  async _getLinkToSchedule(userLogin: string, userPassword: string) {
    const baseUrl = 'https://www.nngasu.ru'
    const urlLogin = 'https://www.nngasu.ru/cdb/schedule/student.php?login=yes';
    const userAgent = 'SmokyBot/1.0'
    const cookieJar = this.cookieJar
    let maxRetries = 100;
    const data = {
      'AUTH_FORM': 'Y',
      'TYPE': 'AUTH',
      'USER_LOGIN': userLogin,
      'USER_PASSWORD': userPassword,
      'backurl': '\\cdb\\schedule\\student.php',
      'Login': 'Войти'
    }

    for (let i = 0; i < maxRetries; i++) {
      // Первый запрос с целью получить первые куки и сформировать оставшиеся
      const response = await got.get(urlLogin, {cookieJar})
      // Если недостаточно куки, то наращиваем
      if (cookieJar.getSetCookieStringsSync(urlLogin).length < 3) {
        const js_p = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
        const jhash = get_jhash(parseInt(js_p.split(',')[0]))

        await Promise.all([
          cookieJar.setCookie(`__jhash_=${jhash}`, baseUrl),
          cookieJar.setCookie(`__jua_=${userAgent}`, baseUrl),
        ])
      }
      // Остальные куки подставятся автоматически из заголовков ответа
      // Если кук недостаточно, то логиниться нет смысла, идем по второму кругу
      if (cookieJar.getSetCookieStringsSync(urlLogin).length < 4) continue
      // Логинимся и достаем ссылку на табличку расписания
      const {body} = await got.post(urlLogin, {cookieJar, form: data})
      return parse(body).querySelector('iframe').rawAttributes.src
    }
  }

  async getScheduleByDate(queryDate: string): Promise<TScheduleDay> {
    const baseUrl = await this._getLinkToSchedule(this.login, this.password)
    const composedUrl = (baseUrl
      + `&ScheduleSearch%5Bstart_date%5D=${queryDate}`
      + `&ScheduleSearch%5Bend_date%5D=${queryDate}`)

    return await axios.get(composedUrl)
      .then((response) => {
        return parse(response.data).querySelectorAll('#schedule-student-container tr')
      })
      .then((rowsDOM) => {
        const date = parseTextCell(rowsDOM[1])
        const lessons = rowsDOM
          .slice(2)
          .map((tr: HTMLElement): TLesson => parseLesson(tr))

        this.schedule = {
          date,
          lessons
        }
        return this.schedule
      })
  }
}

