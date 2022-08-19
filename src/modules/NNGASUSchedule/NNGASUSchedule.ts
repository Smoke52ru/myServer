import axios from 'axios';
import {HTMLElement, parse} from 'node-html-parser';
import Nightmare from 'nightmare';

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
  private nightmare: Nightmare;
  private login: string;
  private password: string;
  public schedule: TScheduleDay;

  constructor(login: string, password: string) {
    this.nightmare = new Nightmare({
      typeInterval: 1,
      pollInterval: 50,
      show: !!process.env.DEV_MODE
    });
    this.login = login
    this.password = password
  }

  async _getLinkToSchedule(userLogin: string, userPassword: string) {
    const urlLogin = 'https://www.nngasu.ru/cdb/schedule/student.php?login=yes';

    return this.nightmare
      .goto(urlLogin)
      .wait('input')
      .insert("input[name='USER_LOGIN']", userLogin)
      .insert("input[name='USER_PASSWORD']", userPassword)
      .click("input[name='Login']")
      .wait('iframe')
      .evaluate(() => {
        return document.querySelector('iframe').src
      }).end();
  }

  async getScheduleByDate(date: string): Promise<TScheduleDay> {
    const baseUrl = await this._getLinkToSchedule(this.login, this.password)
    const composedUrl = (baseUrl
      + `&ScheduleSearch%5Bstart_date%5D=${date}`
      + `&ScheduleSearch%5Bend_date%5D=${date}`)

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

